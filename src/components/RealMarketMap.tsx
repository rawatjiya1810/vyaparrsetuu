import React, { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import {
  LocalBusiness,
  OpportunityZone,
  BusinessProfile,
} from "../types";

interface RealMarketMapProps {
  businessProfile: BusinessProfile;
  localBusinesses: LocalBusiness[];
  opportunityZones?: OpportunityZone[];
  selectedRadius?: number;
  selectedBusiness?: LocalBusiness | null;
  onSelectBusiness?: (b: LocalBusiness) => void;
  activeZone?: OpportunityZone | null;
  onSelectZone?: (z: OpportunityZone) => void;
  heightClass?: string;
  showLegend?: boolean;
  onMapClick?: () => void;
}

// Helper to create GeoJSON circle polygon for MapLibre
function createGeoJSONCircle(center: [number, number], radiusInKm: number, points: number = 64) {
  const lng = center[0];
  const lat = center[1];
  const distanceX = radiusInKm / (111.32 * Math.cos((lat * Math.PI) / 180));
  const distanceY = radiusInKm / 110.574;

  const ret = [];
  for (let i = 0; i < points; i++) {
    const theta = (i / points) * (2 * Math.PI);
    const x = distanceX * Math.cos(theta);
    const y = distanceY * Math.sin(theta);
    ret.push([lng + x, lat + y]);
  }
  ret.push(ret[0]);

  return {
    type: "Feature" as const,
    geometry: {
      type: "Polygon" as const,
      coordinates: [ret],
    },
    properties: {},
  };
}

export const RealMarketMap: React.FC<RealMarketMapProps> = ({
  businessProfile,
  localBusinesses = [],
  opportunityZones = [],
  selectedRadius = 3,
  selectedBusiness = null,
  onSelectBusiness,
  activeZone = null,
  onSelectZone,
  heightClass = "h-64 sm:h-72",
  showLegend = true,
  onMapClick,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [mapError, setMapError] = useState<boolean>(false);

  const centerLat = businessProfile.coordinates?.lat || 28.8154;
  const centerLng = businessProfile.coordinates?.lng || 79.0257;

  // Filter out user business for surrounding markers
  const nearbyEntities = localBusinesses.filter(
    (b) => b.type !== "user" && (selectedRadius === undefined || b.distanceKm <= selectedRadius)
  );

  const counts = {
    similar: nearbyEntities.filter((b) => b.type === "similar").length,
    complementary: nearbyEntities.filter((b) => b.type === "complementary").length,
    supplier: nearbyEntities.filter((b) => b.type === "supplier").length,
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      if (!mapInstanceRef.current) {
        // MapLibre style using 100% free OpenStreetMap raster tiles (Zero API keys required)
        const mapStyle: maplibregl.StyleSpecification = {
          version: 8,
          sources: {
            "osm-tiles": {
              type: "raster",
              tiles: [
                "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
              ],
              tileSize: 256,
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            },
          },
          layers: [
            {
              id: "osm-tiles-layer",
              type: "raster",
              source: "osm-tiles",
              minzoom: 0,
              maxzoom: 19,
            },
          ],
        };

        const map = new maplibregl.Map({
          container: mapContainerRef.current,
          style: mapStyle,
          center: [centerLng, centerLat],
          zoom: selectedRadius <= 1 ? 14.5 : selectedRadius <= 3 ? 13.5 : selectedRadius <= 5 ? 12.5 : 11.5,
          attributionControl: { compact: true },
        });

        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

        map.on("error", () => {
          setMapError(true);
        });

        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;

      map.on("load", () => {
        renderOverlaysAndMarkers(map);
      });

      if (map.isStyleLoaded()) {
        renderOverlaysAndMarkers(map);
      }
    } catch (err) {
      console.error("Map initialization error:", err);
      setMapError(true);
    }

    function renderOverlaysAndMarkers(map: maplibregl.Map) {
      // Clear previous markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      // Set view
      map.setCenter([centerLng, centerLat]);

      // 1. Add Radius Circle Layer
      const circleGeoJSON = createGeoJSONCircle([centerLng, centerLat], selectedRadius);
      if (map.getSource("radius-circle-source")) {
        (map.getSource("radius-circle-source") as maplibregl.GeoJSONSource).setData(circleGeoJSON);
      } else {
        map.addSource("radius-circle-source", {
          type: "geojson",
          data: circleGeoJSON,
        });

        map.addLayer({
          id: "radius-circle-fill",
          type: "fill",
          source: "radius-circle-source",
          paint: {
            "fill-color": "#014D4E",
            "fill-opacity": 0.08,
          },
        });

        map.addLayer({
          id: "radius-circle-outline",
          type: "line",
          source: "radius-circle-source",
          paint: {
            "line-color": "#014D4E",
            "line-width": 2,
            "line-dasharray": [3, 3],
          },
        });
      }

      // 2. User Business Marker (Center)
      const userEl = document.createElement("div");
      userEl.className = "custom-maplibre-user-marker";
      userEl.innerHTML = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <div style="position: absolute; width: 32px; height: 32px; background: rgba(1,77,78,0.25); border-radius: 50%;"></div>
          <div style="width: 24px; height: 24px; background: #014D4E; border: 3px solid #FFFFFF; border-radius: 50%; box-shadow: 0 4px 12px rgba(1,77,78,0.4); display: flex; align-items: center; justify-content: center; z-index: 10;">
            <div style="width: 8px; height: 8px; background: #FFFFFF; border-radius: 50%;"></div>
          </div>
        </div>
      `;

      const userPopup = new maplibregl.Popup({ offset: 15 }).setHTML(`
        <div style="font-family: system-ui, sans-serif; padding: 4px; min-width: 150px;">
          <div style="font-size: 10px; font-weight: 800; color: #014D4E; text-transform: uppercase; letter-spacing: 0.5px;">Your Business</div>
          <div style="font-size: 13px; font-weight: 800; color: #172B35; margin-top: 2px;">${businessProfile.businessName}</div>
          <div style="font-size: 11px; color: #526671; margin-top: 2px;">${businessProfile.location}</div>
        </div>
      `);

      const userMarker = new maplibregl.Marker({ element: userEl })
        .setLngLat([centerLng, centerLat])
        .setPopup(userPopup)
        .addTo(map);

      markersRef.current.push(userMarker);

      // 3. Opportunity Zones (if present in backend data)
      opportunityZones.forEach((zone, idx) => {
        const zoneGeoJSON = createGeoJSONCircle(
          [zone.coordinates.lng, zone.coordinates.lat],
          (zone.radiusMeters || 500) / 1000
        );

        const sourceId = `zone-source-${zone.id || idx}`;
        if (map.getSource(sourceId)) {
          (map.getSource(sourceId) as maplibregl.GeoJSONSource).setData(zoneGeoJSON);
        } else {
          map.addSource(sourceId, {
            type: "geojson",
            data: zoneGeoJSON,
          });

          map.addLayer({
            id: `${sourceId}-fill`,
            type: "fill",
            source: sourceId,
            paint: {
              "fill-color": "#F4C430",
              "fill-opacity": 0.2,
            },
          });

          map.addLayer({
            id: `${sourceId}-outline`,
            type: "line",
            source: sourceId,
            paint: {
              "line-color": "#8C6200",
              "line-width": 1.5,
              "line-dasharray": [2, 2],
            },
          });
        }

        const zoneEl = document.createElement("div");
        zoneEl.innerHTML = `
          <div style="background: #FFFFFF; border: 1.5px solid #F4C430; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; color: #8C6200; box-shadow: 0 2px 6px rgba(0,0,0,0.15); cursor: pointer;">
            ★ ${zone.name}
          </div>
        `;

        const zonePopup = new maplibregl.Popup({ offset: 10 }).setHTML(`
          <div style="font-family: system-ui, sans-serif; padding: 4px; max-width: 220px;">
            <div style="font-size: 10px; font-weight: 800; color: #8C6200; text-transform: uppercase;">Opportunity Zone</div>
            <div style="font-size: 13px; font-weight: 800; color: #172B35; margin-top: 2px;">${zone.name}</div>
            <div style="font-size: 11px; color: #2D3E46; margin-top: 4px;">${zone.description}</div>
          </div>
        `);

        const zoneMarker = new maplibregl.Marker({ element: zoneEl })
          .setLngLat([zone.coordinates.lng, zone.coordinates.lat])
          .setPopup(zonePopup)
          .addTo(map);

        zoneMarker.getElement().addEventListener("click", () => {
          if (onSelectZone) onSelectZone(zone);
        });

        markersRef.current.push(zoneMarker);
      });

      // 4. Nearby Businesses Markers
      nearbyEntities.forEach((biz) => {
        let bgColor = "#60727A";
        let label = "Similar Store";
        if (biz.type === "complementary") {
          bgColor = "#8C6200";
          label = "Complementary Partner";
        } else if (biz.type === "supplier") {
          bgColor = "#2E8B57";
          label = "Supplier / Miller";
        } else if (biz.type === "customer") {
          bgColor = "#014D4E";
          label = "Institutional Customer";
        }

        const isSelected = selectedBusiness?.id === biz.id;

        const bizEl = document.createElement("div");
        bizEl.style.cursor = "pointer";
        bizEl.innerHTML = `
          <div style="position: relative; display: flex; align-items: center; justify-content: center;">
            ${
              isSelected
                ? `<div style="position: absolute; width: 26px; height: 26px; background: ${bgColor}40; border-radius: 50%;"></div>`
                : ""
            }
            <div style="width: ${isSelected ? "20px" : "16px"}; height: ${
          isSelected ? "20px" : "16px"
        }; background: ${bgColor}; border: 2px solid #FFFFFF; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3); transition: all 0.2s;"></div>
          </div>
        `;

        const bizPopup = new maplibregl.Popup({ offset: 12 }).setHTML(`
          <div style="font-family: system-ui, sans-serif; padding: 4px; min-width: 160px;">
            <div style="font-size: 10px; font-weight: 800; color: ${bgColor}; text-transform: uppercase;">${label}</div>
            <div style="font-size: 13px; font-weight: 800; color: #172B35; margin-top: 2px;">${biz.name}</div>
            <div style="font-size: 11px; color: #526671; margin-top: 2px;">${biz.distanceKm} km away • ${biz.direction}</div>
            <div style="font-size: 11px; color: #2D3E46; margin-top: 4px; line-height: 1.4;">${biz.whyUseful || biz.potentialConnection}</div>
          </div>
        `);

        const marker = new maplibregl.Marker({ element: bizEl })
          .setLngLat([biz.coordinates.lng, biz.coordinates.lat])
          .setPopup(bizPopup)
          .addTo(map);

        marker.getElement().addEventListener("click", () => {
          if (onSelectBusiness) onSelectBusiness(biz);
        });

        markersRef.current.push(marker);
      });
    }
  }, [
    centerLat,
    centerLng,
    selectedRadius,
    businessProfile,
    localBusinesses,
    opportunityZones,
    selectedBusiness,
  ]);

  if (mapError) {
    return (
      <div
        className={`w-full ${heightClass} rounded-xl border border-[#E6DED7] bg-[#F8F3EE] flex items-center justify-center p-4 text-center`}
      >
        <p className="font-sans text-xs font-semibold text-[#526671]">
          Map data is temporarily unavailable.
        </p>
      </div>
    );
  }

  return (
    <div
      onClick={onMapClick}
      className={`relative w-full ${heightClass} rounded-xl border border-[#E6DED7] overflow-hidden bg-[#F8F3EE] shadow-xs group`}
    >
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Subtle Map Legend Overlay */}
      {showLegend && (
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-[#E6DED7] shadow-xs font-sans text-[10px] space-y-1 z-[10] pointer-events-auto">
          <div className="flex items-center gap-1.5 font-bold text-[#014D4E]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#014D4E]"></span> Your Business
          </div>
          {counts.similar > 0 && (
            <div className="flex items-center gap-1.5 text-[#526671] font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#526671]"></span> Similar Stores ({counts.similar})
            </div>
          )}
          {counts.complementary > 0 && (
            <div className="flex items-center gap-1.5 text-[#8C6200] font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8C6200]"></span> Complementary ({counts.complementary})
            </div>
          )}
          {counts.supplier > 0 && (
            <div className="flex items-center gap-1.5 text-[#2E8B57] font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E8B57]"></span> Suppliers ({counts.supplier})
            </div>
          )}
          {opportunityZones.length > 0 && (
            <div className="flex items-center gap-1.5 text-[#8C6200] font-bold border-t border-[#E6DED7] pt-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F4C430]/30 border border-[#F4C430]"></span> Opportunity
            </div>
          )}
        </div>
      )}

      {/* Radius Indicator Pill */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#E6DED7] shadow-xs font-sans text-[10px] font-semibold text-[#172B35] z-[10]">
        📍 Radius: {selectedRadius} km • {businessProfile.location?.split(",")[0] || "Rampur"}
      </div>
    </div>
  );
};
