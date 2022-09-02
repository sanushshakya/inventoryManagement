module.exports = {
    "info": {
        "_postman_id": "2fd57584-e7e4-4064-9df6-ed4991f40900",
        "name": "inventory management",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
        {
            "name": "brands",
            "item": [
                {
                    "name": "get all Copy",
                    "request": {
                        "method": "GET",
                        "header": [],
                        "url": {
                            "raw": "http://localhost:5000/api/brands",
                            "protocol": "http",
                            "host": [
                                "localhost"
                            ],
                            "port": "5000",
                            "path": [
                                "api",
                                "brands"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "add new Copy",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/brands",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "brands"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "update brand",
                    "event": [
                        {
                            "listen": "test",
                            "script": {
                                "exec": [
                                    ""
                                ],
                                "type": "text/javascript"
                            }
                        }
                    ],
                    "request": {
                        "method": "PATCH",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"brand_name\":\"just kiddinggg\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/brands/9",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "brands",
                                "9"
                            ]
                        }
                    },
                    "response": []
                }
            ]
        },
        {
            "name": "inventory",
            "item": [
                {
                    "name": "get all Copy",
                    "request": {
                        "method": "GET",
                        "header": [],
                        "url": {
                            "raw": "http://{{url}}/api/inventory",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "inventory"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "update inventory item",
                    "event": [
                        {
                            "listen": "test",
                            "script": {
                                "exec": [
                                    ""
                                ],
                                "type": "text/javascript"
                            }
                        }
                    ],
                    "request": {
                        "method": "PATCH",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"in_stock\":\"10\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/inventory/3",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "inventory",
                                "3"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "delete inventory item",
                    "event": [
                        {
                            "listen": "test",
                            "script": {
                                "exec": [
                                    ""
                                ],
                                "type": "text/javascript"
                            }
                        }
                    ],
                    "request": {
                        "method": "DELETE",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"brand_name\":\"just kiddinggg\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/inventory/3",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "inventory",
                                "3"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "add new item in inventory",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"item_id\":3,\n    \"in_stock\":700\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/inventory",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "inventory"
                            ]
                        }
                    },
                    "response": []
                }
            ]
        },
        {
            "name": "category",
            "item": [
                {
                    "name": "get all",
                    "request": {
                        "method": "GET",
                        "header": [],
                        "url": {
                            "raw": "http://{{url}}/api/categories",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "categories"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "add new",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"category_type\":\"test category new\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/categories/",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "categories",
                                ""
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "update",
                    "request": {
                        "method": "PATCH",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"category_type\":\"test category new\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/categories/13",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "categories",
                                "13"
                            ]
                        }
                    },
                    "response": []
                }
            ]
        },
        {
            "name": "vendors",
            "item": [
                {
                    "name": "get all",
                    "request": {
                        "method": "GET",
                        "header": [],
                        "url": {
                            "raw": "http://{{url}}/api/vendors",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "vendors"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "add new",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"name\":\"test vendoreeerrr\",\n    \"phone\":\"9812345678abc\",\n    \"address\":\"TEST ADDRESS HEHE\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/vendors",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "vendors"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "update",
                    "request": {
                        "method": "PATCH",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"name\":\"update test\",\n    \"address\":\"yoo\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/vendors/1",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "vendors",
                                "1"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "delete",
                    "request": {
                        "method": "DELETE",
                        "header": [],
                        "url": {
                            "raw": "http://{{url}}/api/items/2",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "items",
                                "2"
                            ]
                        }
                    },
                    "response": []
                }
            ]
        },
        {
            "name": "order status",
            "item": [
                {
                    "name": "get all",
                    "request": {
                        "method": "GET",
                        "header": [],
                        "url": {
                            "raw": "http://{{url}}/api/order-status",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "order-status"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "add new",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"name\":\"test vendoreeerrr\",\n    \"phone\":\"9812345678abc\",\n    \"address\":\"TEST ADDRESS HEHE\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/vendors",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "vendors"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "update",
                    "request": {
                        "method": "PATCH",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"status\":\"\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/order-status",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "order-status"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "delete",
                    "request": {
                        "method": "DELETE",
                        "header": [],
                        "url": {
                            "raw": "http://{{url}}/api/items/2",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "items",
                                "2"
                            ]
                        }
                    },
                    "response": []
                }
            ]
        },
        {
            "name": "items",
            "item": [
                {
                    "name": "get all",
                    "protocolProfileBehavior": {
                        "disableBodyPruning": true
                    },
                    "request": {
                        "method": "GET",
                        "header": [],
                        "body": {
                            "mode": "formdata",
                            "formdata": [
                                {
                                    "key": "category_id",
                                    "value": "",
                                    "type": "text"
                                },
                                {
                                    "key": "brand_id",
                                    "value": "",
                                    "type": "text"
                                },
                                {
                                    "key": "name",
                                    "value": "",
                                    "type": "text"
                                },
                                {
                                    "key": "description",
                                    "value": "",
                                    "type": "text"
                                },
                                {
                                    "key": "image",
                                    "value": "",
                                    "type": "text"
                                },
                                {
                                    "key": "sku_code",
                                    "value": "",
                                    "type": "text"
                                }
                            ]
                        },
                        "url": {
                            "raw": "http://{{url}}/api/items",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "items"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "delete",
                    "request": {
                        "method": "DELETE",
                        "header": [],
                        "url": {
                            "raw": "http://{{url}}/api/items/2",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "items",
                                "2"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "add new",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "formdata",
                            "formdata": [
                                {
                                    "key": "image",
                                    "type": "file",
                                    "src": "/home/twobits/Downloads/ctzshp.jpg"
                                },
                                {
                                    "key": "category_id",
                                    "value": "5",
                                    "type": "text"
                                },
                                {
                                    "key": "brand_id",
                                    "value": "5",
                                    "type": "text"
                                },
                                {
                                    "key": "sku_code",
                                    "value": "7891",
                                    "type": "text"
                                },
                                {
                                    "key": "name",
                                    "value": "sanush item",
                                    "type": "text"
                                },
                                {
                                    "key": "description",
                                    "value": "item desc",
                                    "type": "text"
                                }
                            ],
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/items",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "items"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "update item",
                    "request": {
                        "method": "PATCH",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/items/3",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "items",
                                "3"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "update item image",
                    "request": {
                        "method": "PATCH",
                        "header": [],
                        "body": {
                            "mode": "formdata",
                            "formdata": [
                                {
                                    "key": "image",
                                    "type": "file",
                                    "src": "/home/twobits/Pictures/Screenshot from 2022-02-24 11-42-03.png"
                                }
                            ]
                        },
                        "url": {
                            "raw": "http://{{url}}/api/items/updateimage/8",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "items",
                                "updateimage",
                                "8"
                            ]
                        }
                    },
                    "response": []
                }
            ]
        },
        {
            "name": "order lines",
            "item": [
                {
                    "name": "get all",
                    "request": {
                        "method": "GET",
                        "header": [],
                        "url": {
                            "raw": "http://{{url}}/api/order-lines",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "order-lines"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "get purchase order pdf",
                    "request": {
                        "method": "GET",
                        "header": [],
                        "url": {
                            "raw": "http://{{url}}/api/order-lines/get-order-pdf/41",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "order-lines",
                                "get-order-pdf",
                                "41"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "delete",
                    "request": {
                        "method": "DELETE",
                        "header": [],
                        "url": {
                            "raw": "http://{{url}}/api/items/2",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "items",
                                "2"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "add new",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"vendor_id\":\"1\",\n    \"order_status_id\":\"2\",\n    \"description\":\"new sanush order two\",\n    \"invoice_number\":\"9999999\",\n    \"order_date\":\"2021/06/12\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/order-lines",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "order-lines"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "update item",
                    "request": {
                        "method": "PATCH",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"vendor_id\":1,\n    \"order_status_id\":2, \n    \"description\":\"new order description\",\n    \"invoice_number\":1234,\n    \"order_date\":\"2017/08/12\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/order-lines/30",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "order-lines",
                                "30"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "update order line item",
                    "request": {
                        "method": "PATCH",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"price\": 999,\n    \"order_quantity\":20\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/order-lines/30/item/3",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "order-lines",
                                "30",
                                "item",
                                "3"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "update order line receive quantity",
                    "request": {
                        "method": "PATCH",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"received_quantity\": 8\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/order-lines/39/update-received/8",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "order-lines",
                                "39",
                                "update-received",
                                "8"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "add item",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"price\":2000,\n    \"order_quantity\":10\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/order-lines/41/item/9",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "order-lines",
                                "41",
                                "item",
                                "9"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "complete order",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/order-lines/complete-order/41",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "order-lines",
                                "complete-order",
                                "41"
                            ]
                        }
                    },
                    "response": []
                },
                {
                    "name": "remove item from line",
                    "request": {
                        "method": "DELETE",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"item_id\":3,\n    \"price\":123,\n    \"order_quantity\":2333\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://{{url}}/api/order-lines/38/item/4",
                            "protocol": "http",
                            "host": [
                                "{{url}}"
                            ],
                            "path": [
                                "api",
                                "order-lines",
                                "38",
                                "item",
                                "4"
                            ]
                        }
                    },
                    "response": []
                }
            ]
        }
    ],
    "variable": [
        {
            "key": "url",
            "value": "url"
        }
    ]
}