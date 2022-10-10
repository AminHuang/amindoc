## lateinit 和 lazy

`lateinit` 和 `lazy` 是kotlin中两种不同的延迟初始化的实现

`lateinit` 只用于变量 `var`，而`lazy`只用于常量 `val`

> lazy 应用于单例模式(if-null-then-init-else-return)，而且当且仅当变量被第一次调用的时候，委托方法才会执行

`lazy()`接受一个lambda并返回一个`Lazy<T>`示例

例子：
```kotlin
    private val mmkv by lazy { MultiProcessMMKV.getMMKV(TAG, MultiProcessMMKV.MULTI_PROCESS_MODE) }
    private fun generateIfNull(): String {
        val KEY = "$TAG.deviceId"
        var deviceId = mmkv.getString(KEY, "")
        if (deviceId.isNullOrEmpty()) {
            deviceId = StringUtils.substring("LU" + DeviceId.generateDeviceId(), 0, 16)
            Log.d(TAG, "generated luggage deviceId: $deviceId")
            mmkv.putString(KEY, deviceId)
        } else {
            Log.d(TAG, "get saved luggage deviceId: $deviceId")
        }
        return deviceId!!
    }
```


参考引用：[Kotlin lateinit 和 by lazy](https://www.jianshu.com/p/e2cb4c65d4ff)