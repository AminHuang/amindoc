## adb 调试

```Bash
adb shell am set-debug-app -w com.tencent.wmpf.cli.debugassist:wxa_container0

adb shell am set-debug-app -w com.tencent.weauth:wxa_container0 

```

想要清除设置

```Ruby
adb shell am clear-debug-app
```

如果有多个设备上面可能是清除不成功的，需要一个一个设备清除(加个 -s 参数)

```Ruby
 adb -s emulator-5554 shell am clear-debug-app
```

![](https://secure2.wostatic.cn/static/vVTr91DFhJ4mS8VYiQMogc/image.png)

