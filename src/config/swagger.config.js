module.exports = {
  "openapi": "3.0.0",
  "info": {
    "title": "inventory management system",
    "contact": {},
    "version": "1.0"
  },
  "servers": [
    {
      "url": "http://localhost:{port}/api",
      "variables": {
        "port": {
          "default": 5000,
          "description": "base api url"
        }
      }
    }
  ],
  "tags": [
    {
      "name": "categories",
      "description": "item category type"
    },
    {
      "name": "brands",
      "description": "item brand names"
    },
    {
      "name":"vendors",
      "description": "the vendors of items"
    },
    {
      "name": "items",
      "description": "all items that may be in an inventory"
    },  
    {
      "name":"order status",
      "description": "the possible status of an order line"
    },
    {
      "name":"order lines",
      "description": "order lines of items"
    },
    {
      "name":"inventory",
      "description": "information about stock of items available in the inventory"
    },
   
  ]
}

