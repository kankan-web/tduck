# API设计

## 用户功能

### 获取用户信息

- method:`get`
- path:`/api/user/info`
- response:`{code,data:{...}`或`{code:"E001",msg:'xxx'}`

### 注册

- method:`post`
- path:`/api/user/register`
- request body:`{username,password,email}`
- response:`{code}`

### 登录

- method:`post`
- path:`/api/user/login`
- request body:`{username,password}`
- response:`{code,data:{token}}`--**JWT**使用Token

## 问卷功能

### 创建问卷

- method:`post`
- path:`/api/question`
- request body:`{title,isStar,isPublished,isExpired,expiredAt,questions}`
- response:`{code,data:{_id,title}}`

### 更新问卷信息

- method:`patch`
- path:`/api/question/:id`
- request body:`{title,isStar ...}`
- response:`{code}`
PS:删除是假删除，实际是更新`isDeleted`属性

### 批量彻底删除问卷

- method:`delete`
- path:`/api/question`
- request body:`{ids:[...]}`
- response:`{code}`

### 复制问卷

- method:`post`
- path:`/api/question/duplicate/:id`
- response:`{code,data:{_id,title}}`

## 小结

- 使用RestFul风格
- 用户验证使用JWT
- 统一返回格式`{code,data,msg}`
