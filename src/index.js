import { request } from "@esri/arcgis-rest-request";
import { UserSession } from "@esri/arcgis-rest-auth";
import { createItem } from "@esri/arcgis-rest-items";

/*
You can generate your own clientid by creating an application on https://developers.arcgis.com. Be sure to add http://localhost:8080/ and any production urls as valid redirect uris for your application.
*/
const clientId = "ePF8QFbgoWIkedxD"

const component = () => {
  let element = document.createElement('button');
  element.innerHTML = "Open in ArcGIS Online"

  element.addEventListener("click", () => {
    UserSession.beginOAuth2({
      clientId,
      redirectUri: 'http://localhost:8080/authenticate.html'
    })
      .then(authentication => {
        createItem({
          item,
          authentication
        })
          .then(response => {
            const id = response.id;
            request(`https://www.arcgis.com/sharing/rest/content/users/${encodeURIComponent(authentication.username)}/items/${id}/share`, {
              params: {
                everyone: true
              },
              authentication
            })
              .then(() => {
                window.open(`https://www.arcgis.com/home/webmap/viewer.html?&layers=${id}`,'_blank');
              })
          })
      })    
  })
  return element;
}

const data = {
  "url": "https://geowebservices.stanford.edu/geoserver/wfs",
  "mode": 0,
  "wfsInfo": {
    "version": "2.0.0",
    "name": "gd672hm7648",
    "wfsNamespace": "http://purl.stanford.edu",
    "featureUrl": "https://geowebservices.stanford.edu:443/geoserver/wfs",
    "supportedSpatialReferences": [
      4326
    ]
  },
  "layerDefinition": {
    "geometryType": "esriGeometryPolyline",
    "drawingInfo": {
      "renderer": {
        "type": "simple",
        "symbol": {
          "color": [
            77,
            77,
            77,
            255
          ],
          "width": 2,
          "type": "esriSLS",
          "style": "esriSLSSolid"
        }
      }
    },
    "spatialReference": {
      "wkid": 4326
    },
    "fields": [
      {
        "name": "shape_leng",
        "alias": "shape_leng",
        "type": "esriFieldTypeDouble",
        "wfsNamespace": "http://www.w3.org/2001/XMLSchema"
      },
      {
        "name": "geom",
        "alias": "geom",
        "type": "esriFieldTypeGeometry",
        "wfsNamespace": "http://www.opengis.net/gml/3.2"
      }
    ]
  },
  "popupInfo": {
    "title": "1 Degree Graticule, Northeast United States, 2010",
    "fieldInfos": [
      {
        "fieldName": "shape_leng",
        "label": "shape_leng",
        "tooltip": "",
        "visible": false,
        "format": {
          "places": 2,
          "digitSeparator": true
        },
        "stringFieldOption": "textbox"
      },
      {
        "fieldName": "geom",
        "label": "geom",
        "tooltip": "",
        "visible": false,
        "format": null,
        "stringFieldOption": "textbox"
      }
    ],
    "description": null,
    "showAttachments": true,
    "mediaInfos": []
  }
}

const item = {
  "title": "Northeast Graticule",
  "type": "WFS",
  "typeKeywords": [
    "Data",
    "OGC",
    "Service",
    "Web Feature Service"
  ],
  "tags": [ "geoblacklight" ],
  "thumbnail": "thumbnail/ago_downloaded.png",
  "extent": [
    [
      -74.0450057983398,
      36.9549980163574
    ],
    [
      -64.9549942016602,
      46.0450019836426
    ]
  ],
  "culture": "en-us",
  "url": "https://geowebservices.stanford.edu/geoserver/wfs",
  "data" : data
}

document.body.appendChild(component());