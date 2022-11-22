## fat-arr 合并构建

在Android应用程序开发过程中，一般会构建多个模块，来解耦

但有需求要求提供一个依赖库给外部使用



打包一个aar的结构：

```XML
它的文件后缀名是.aar，它本身是一个zip文件，强制包含以下文件：
/AndroidManifest.xml
/classes.jar
/res/
/R.txt

另外，AAR文件可以包括以下可选条目中的一个或多个：
/assets/
/libs/name.jar
/jni/abi_name/name.so (where abi_name is one of the Android supported ABIs)
/proguard.txt
/lint.jar
```

这里假设有两个libs，分别为module1和module2。

此时为了合成一个aar，需要将module2中的 .jar / res / assets 中的文件资源插入到module1中，将 AndroidManifest.xml 和 R.txt 相互合并merge

> 核心思想就是将一个file下的文档拷贝到另一个下面，合并名称相同的两个文件。当然，这些都是在恰当的task前后插入