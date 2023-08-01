
## 记录一些问题

### java.lang.AbstractMethodError: abstract method "okhttp3.Response okhttp3.Interceptor.intercept(okhttp3.Interceptor$Chain)"
这个应该是sdk混淆配置有问题，把继承的Interceptor给直接优化掉了