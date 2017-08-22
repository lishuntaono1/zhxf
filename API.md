# 后台接口文档
```

主机:发布后具体定

端口：8001

所有请求 'https://' + 主机 + ':' + 端口+接口路径方式
```

## 目录

## 接口列表：

### 1、获取城市列表

#### 请求URL:
```
http://localhost:5001/v1/cities
```

#### 示例：
 <http://localhost:5001/v1/cities?type=guess>

#### 请求方式:
```
GET
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|type      |Y       |string  |guess：定位城市，  hot：热门城市， group：所有城市 |

#### 返回示例：

```javascript
{
  id: 1,
  name: "上海",
  abbr: "SH",
  area_code: "021",
  sort: 1,
  latitude: 31.23037,
  longitude: 121.473701,
  is_map: true,
  pinyin: "shanghai"
}
```

### 2、获取所选城市信息

#### 请求URL：
```
http://localhost:5001/v1/cities/:id
```

#### 示例：
[http://localhost:5001/v1/cities/1](http://localhost:5001/v1/cities/1)

#### 请求方式：
```
GET
```

#### 参数类型：param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |int   |城市id |

#### 返回示例：
```javascript
{
  id: 1,
  name: "上海",
  abbr: "SH",
  area_code: "021",
  sort: 1,
  latitude: 31.23037,
  longitude: 121.473701,
  is_map: true,
  pinyin: "shanghai"
}
```

### 3、搜索地址

#### 请求URL：
```
http://localhost:5001/v1/pois
```

#### 示例：
[http://localhost:5001/v1/pois?city_id=1&keyword=迪士尼&type=search](http://localhost:5001/v1/pois?city_id=1&keyword=%E8%BF%AA%E5%A3%AB%E5%B0%BC&type=search)

#### 请求方式：
```
GET
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|city_id      |Y       |int   |城市id |
|keyword      |Y       |string   |搜索关键词 |
|type      |N       |string   |搜索类型，默认为search |

#### 返回示例：

```javascript
[
    {
        name: "上海迪士尼乐园",
        address: "上海市浦东新区申迪西路753号",
        latitude: 31.14419,
        longitude: 121.66034,
        geohash: "31.14419,121.66034"
    },
    {
        name: "迪士尼",
        address: "上海市浦东新区妙境路1118号家乐福川沙店1层",
        latitude: 31.18183,
        longitude: 121.69279,
        geohash: "31.18183,121.69279"
    },
    ...  //共10条数据
]
```

### 4、根据经纬度详细定位

#### 请求URL：
```
http://localhost:5001/v2/pois/:geohash
```

#### 示例：
[http://localhost:5001/v2/pois/31.22967,121.4762](http://localhost:5001/v2/pois/31.22967,121.4762)

#### 请求方式：
```
GET
```

#### 参数类型：param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|geohash      |Y       |string   |经纬度 |

#### 返回示例：

```javascript
{
  address: "上海市黄浦区西藏中路",
  city: "上海市",
  geohash: "31.22967,121.4762",
  latitude: "31.22967",
  longitude: "121.4762",
  name: "黄浦区上海人民广场"
}
```



#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|username      |Y       |string   | 用户名 |
|password      |Y       |string  | 密码 |
|captcha_code      |Y       |string   | 验证码 |



#### 返回示例：

```javascript

{
  username: "1",
  user_id: 2,
  id: 2,
  point: 0,
  mobile: "",
  is_mobile_valid: true,
  is_email_valid: false,
  is_active: 1,
  gift_amount: 3,
  email: "",
  delivery_card_expire_days: 0,
  current_invoice_id: 0,
  current_address_id: 0,
  brand_member_new: 0,
  balance: 0,
  avatar: "/img/default/default.jpg",
  __v: 0
}
```
