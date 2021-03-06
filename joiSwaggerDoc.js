
export default {
  "swagger": "2.0",
  "info": {
    "description": "智慧消防后台api定义",
    "version": "0.0.1",
    "title": "智慧消防Api",
    "contact": {
      "email": "tingkunz@qq.com"
    }
  },
  "host": "easy-mock.com",
  "basePath": "/v1",
  "tags": [{
      "name": "Device",
      "description": "消防设施，消防栓，火灾/电气报警主机， 消防门，灭火器等",
      "externalDocs": {
        "description": "更多介绍",
        "url": "http://localhost/docs/xfsheshi"
      }
    },
    {
      "name": "Unit",
      "description": "消防总队，消防支队，消防中队，消防大队，消防单位 维保公司，检测公司\n"
    },
    {
      "name": "User",
      "description": "对应各级单位人员",
      "externalDocs": {
        "description": "更多介绍",
        "url": "http://localhost/docs/adminRole.md"
      }
    },
    {
      "name": "StatusRecord",
      "description": "传感器，报警主机过来数据"
    },
    {
      "name": "ChkRecord",
      "description": "巡查记录"
    },
    {
      "name": "MaintainRecord",
      "description": "巡查记录"
    }
  ],
  "schemes": [
    "http",
    "https"
  ],
  "paths": {
    "/device": {
      "post": {
        "tags": [
          "Device"
        ],
        "summary": "添加或修改设施",
        "description": "添加消防设施",
        "operationId": "addDevice",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [{
          "in": "body",
          "name": "body",
          "description": "添加到数据库",
          "required": true,
          "schema": {
            "$ref": "#/definitions/Device"
          }
        }],
        "responses": {
          "200": {
            "description": "操作结果ApiRespose定义",
            "schema": {
              "$ref": "#/definitions/ApiResponse"
            }
          }
        }
      }
    },
    "/device/list": {
      "post": {
        "tags": [
          "Device"
        ],
        "summary": "获取设施列表",
        "consumes": [
          "appilcation/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [{
            "name": "page",
            "in": "query",
            "type": "string",
            "description": "页码",
            "default": 1
          },
          {
            "name": "limit",
            "in": "query",
            "type": "string",
            "description": "最多多少"
          },
          {
            "in": "body",
            "name": "body",
            "schema": {
              "$ref": "#/definitions/Device"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "设施列表",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Device"
              }
            }
          }
        }
      }
    },
    "/user": {
      "post": {
        "tags": [
          "User"
        ],
        "summary": "创建或修改用户信息",
        "description": "后台完成",
        "operationId": "addUser",
        "produces": [
          "application/json"
        ],
        "parameters": [{
          "in": "body",
          "name": "body",
          "description": "Created user object",
          "required": true,
          "schema": {
            "$ref": "#/definitions/User"
          }
        }],
        "responses": {
          "default": {
            "description": "successful operation"
          }
        }
      }
    },
    "/user/createWithList": {
      "post": {
        "tags": [
          "User"
        ],
        "summary": "创建多个用户",
        "description": "",
        "operationId": "addUsersWithListInput",
        "produces": [
          "application/json"
        ],
        "parameters": [{
          "in": "body",
          "name": "body",
          "description": "List of user object",
          "required": true,
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/User"
            }
          }
        }],
        "responses": {
          "default": {
            "description": "successful operation"
          }
        }
      }
    },
    "/user/login": {
      "post": {
        "tags": [
          "User"
        ],
        "summary": "Logs user into the system",
        "description": "",
        "operationId": "loginUser",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "parameters": [{
          "in": "body",
          "name": "body",
          "description": "The user name for login",
          "required": true,
          "schema": {
            "type": "object",
            "properties": {
              "phone": {
                "type": "string",
                "description": "用户名"
              },
              "password": {
                "type": "string",
                "description": "密码"
              },
              "validcode": {
                "type": "string",
                "description": "验证码"
              }
            }
          }
        }],
        "responses": {
          "200": {
            "description": "登陆成功",
            "schema": {
              "type": "string"
            },
            "headers": {
              "X-Expires-After": {
                "type": "string",
                "format": "date-time",
                "description": "date in UTC when token expires"
              }
            }
          },
          "400": {
            "description": "用户名或密码错误"
          }
        }
      }
    },
    "/user/logout": {
      "get": {
        "tags": [
          "User"
        ],
        "summary": "登出系统",
        "description": "",
        "operationId": "logoutUser",
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "default": {
            "description": "登出系统"
          }
        }
      }
    },
    "/unit": {
      "post": {
        "tags": [
          "Unit"
        ],
        "summary": "添加或修改单位",
        "description": "添加消防单位",
        "operationId": "addUnit",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [{
          "in": "body",
          "name": "body",
          "description": "添加到数据库",
          "required": true,
          "schema": {
            "$ref": "#/definitions/Unit"
          }
        }],
        "responses": {
          "405": {
            "description": "Invalid input"
          }
        }
      }
    }
  },
  "securityDefinitions": {
    "zhxf_auth": {
      "type": "oauth2",
      "authorizationUrl": "http://xxxxxx/oauth2/dialog",
      "flow": "implicit",
      "scopes": {
        "super": "所有权限",
        "otherrole": "测试"
      }
    },
    "api_key": {
      "type": "apiKey",
      "name": "api_key",
      "in": "header"
    }
  },
  "definitions": {
    "Project": {
      "type": "object",
      "properties": {
        "_id": {
          "type": "string",
          "description": "系统自动生成id，like mongodb"
        },
        "name": {
          "type": "string",
          "description": "消防项目名称"
        },
        "unitName": {
          "type": "string",
          "description": "单位名称"
        },
        "unitId": {
          "type": "string",
          "description": "单位id"
        }
      }
    },
    "Unit": {
      "type": "object",
      "properties": {
        "_id": {
          "type": "string",
          "description": "系统自动生成id，like mongodb"
        },
        "name": {
          "type": "string",
          "description": "单位名称"
        },
        "xfdaduiduiName": {
          "type": "string"
        },
        "xfdaduiduiId": {
          "type": "string",
          "description": "大队id"
        },
        "xfzhongduiName": {
          "type": "string"
        },
        "xfzhongduiId": {
          "type": "string",
          "description": "中队id"
        },
        "xfzhiduiName": {
          "type": "string"
        },
        "xfzhiduiId": {
          "type": "string",
          "description": "支队id"
        },
        "xfzongduiName": {
          "type": "string"
        },
        "xfzongduiId": {
          "type": "string",
          "description": "总队id"
        }
      }
    },
    "User": {
      "type": "object",
      "description": "用户表，树装结构扁平化",
      "properties": {
        "_id": {
          "type": "string",
          "description": "系统自动生成id，like mongodb"
        },
        "name": {
          "type": "string"
        },
        "unit": {
          "type": "string",
          "description": "单位名称"
        },
        "unitId": {
          "type": "string",
          "description": "单位id"
        },
        "password": {
          "type": "string"
        },
        "phone": {
          "type": "string",
          "description": "手机号码"
        },
        "title": {
          "type": "string",
          "description": "职务描述"
        },
        "loginTime": {
          "type": "string",
          "description": "上次登录时间"
        },
        "role": {
          "type": "string",
          "description": "权限角色",
          "externalDocs": {
            "url": "http://localhost/docs/adminRoles.md"
          },
          "enum": [
            "super",
            "wber",
            "xcer",
            "xfadmin"
          ]
        }
      }
    },
    "Device": {
      "type": "object",
      "required": [
        "name",
        "position"
      ],
      "properties": {
        "id": {
          "type": "string",
          "example": "5954724c8683c588e860bdc2(后台自动生成)"
        },
        "name": {
          "type": "string",
          "description": "设施名称",
          "example": "烟雾传感器"
        },
        "rfid": {
          "type": "string",
          "description": "rfid编码"
        },
        "qrcode": {
          "type": "string",
          "description": "二维码"
        },
        "factory": {
          "type": "string",
          "description": "厂家",
          "example": "北大青鸟"
        },
        "unitId": {
          "type": "string",
          "example": "5954724c8683c588e860bdc2"
        },
        "unitName": {
          "type": "string",
          "example": "单位名称"
        },
        "projectName": {
          "type": "string",
          "example": "一期工程"
        },
        "position": {
          "type": "string",
          "example": "6栋5层"
        },
        "location": {
          "type": "string",
          "example": "地理位置信息"
        },
        "install": {
          "description": "安装施工"
        },
        "maintain": {
          "description": "维护保养"
        },
        "produceDate": {
          "description": "生产日期"
        },
        "installDate": {
          "description": "安装日期"
        },
        "maintainDate": {
          "description": "上次维护日期"
        },
        "mainTainUserid": {
          "type": "string",
          "description": "巡查人员id"
        },
        "maintainGap": {
          "type": "integer",
          "description": "维护周期(月)"
        },
        "checkTime": {
          "type": "string",
          "description": "巡查时间"
        },
        "checkResult": {
          "type": "string",
          "description": "巡查结果，ok,bad,un"
        },
        "checkUserid": {
          "type": "string",
          "description": "巡查人员id"
        },
        "status": {
          "type": "string",
          "description": "设施状态,ok,bad,mt--维护，un -- 未知",
          "enum": [
            "ok",
            "bad",
            "mt",
            "un"
          ]
        }
      }
    },
    "StatusRecord": {
      "description": "传感器，报警主机过来数据",
      "type": "object",
      "properties": {
        "timest": {
          "type": "string",
          "description": "时间戳"
        },
        "deviceId": {
          "type": "string",
          "description": "设备id"
        },
        "checkUserid": {
          "type": "string",
          "description": "巡查人员id"
        },
        "status": {
          "type": "string",
          "description": "状态",
          "enum": [
            "ok",
            "warn",
            "bad"
          ]
        },
        "message": {
          "type": "string",
          "description": "故障信息",
          "example": "水压过低"
        }
      }
    },
    "ChkRecord": {
      "description": "巡查记录",
      "type": "object",
      "properties": {
        "timest": {
          "type": "string",
          "description": "时间戳"
        },
        "deviceId": {
          "type": "string",
          "description": "设备id"
        },
        "status": {
          "type": "string",
          "description": "状态",
          "enum": [
            "ok",
            "warn",
            "bad"
          ]
        },
        "message": {
          "type": "string",
          "description": "故障信息",
          "example": "水压过低"
        }
      }
    },
    "MaintainRecord": {
      "description": "维保记录",
      "type": "object",
      "properties": {
        "timest": {
          "type": "string",
          "description": "时间戳"
        },
        "deviceId": {
          "type": "string",
          "description": "设备id"
        },
        "status": {
          "type": "string",
          "description": "状态",
          "enum": [
            "ok",
            "warn",
            "bad"
          ]
        },
        "message": {
          "type": "string",
          "description": "故障信息",
          "example": "水压过低"
        }
      }
    },
    "ApiResponse": {
      "type": "object",
      "properties": {
        "code": {
          "type": "string",
          "description": "状态码"
        },
        "type": {
          "type": "string"
        },
        "message": {
          "type": "string"
        }
      }
    }
  }
}