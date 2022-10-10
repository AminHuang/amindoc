## AtomicBoolean 原子变量

> AtomicBoolean是Java.util.concurrent.atomic包下的原子变量，这个包里面提供了一组原子类。其基本的特性就是在多线程环境下，当有多个线程同时执行这些类的实例包含的方法时，具有排他性，即当某个线程进入方法，执行其中的指令时，不会被其他线程打断，而别的线程就像自旋锁一样，一直等到该方法执行完成，才由JVM从等待队列中选择一个另一个线程进入，这只是一种逻辑上的理解。实际上是借助硬件的相关指令来实现的，不会阻塞线程(或者说只是在硬件级别上阻塞了)。

我个人理解就是加锁

### 用来实现waitfor
```kotlin
    private const val LAZY_LOAD_SERIAL_TAG = "MainProcessStartup-LoadLazyModules"
    fun waitForLoaded(block: ()->Unit) {
        if (isLazyModulesLoaded.get()) {
            block()
        } else {
            ThreadPool.INSTANCE.compute(object : Runnable {
                override fun run() {
                    if (isLazyModulesLoaded.get()) {
                        block()
                    } else {
                        ThreadPool.INSTANCE.computeDelay(this, 100L, LAZY_LOAD_SERIAL_TAG)
                    }
                }
            }, LAZY_LOAD_SERIAL_TAG)
        }
    }
```



#### 参考引用
- [AtomicBoolean介绍与使用](https://www.jianshu.com/p/9985810bd8cb)