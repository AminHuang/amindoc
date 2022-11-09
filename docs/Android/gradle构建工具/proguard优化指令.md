
- 压缩（shrinks）：检查并移除代码中无用的类，字段，方法，属性
- 优化（optimizes）：对字节码进行优化，移除无用的指令
- 混淆（obfuscates）：使用a,b,c,d等简短而无意义的名称，对类，字段和方法重名，这样即使代码被逆向工程，也比较难懂
- 预检测（preveirfy）：在java平台上对处理后的代码进行再次检测

都是为了防止反编译拿到核心代码。



`assumenosideeffects`拆开是`assume no side effects`，假定无效的意思，就是说被标识的代码是无效代码，可以被删掉。 我们通常用此指令删除一些日志打印的类和相关方法调用



### consumerProguardFiles 和 proguardFiles 区别

一些注意：

- 主模块的混淆开关配置会直接影响到子模块，也就是说如果你的主模块开启的混淆，就算子模块混淆开关关闭，最终子模块一样会被混淆
- 子模块混淆文件的指定是通过consumerProguardFiles这个属性指定的，并不是proguardFiles 属性，无需配置其他选项。该属性表示在打包时会自动寻找该module下我们指定的混淆文件对代码进行混淆



```Ruby
-include {filename}    从给定的文件中读取配置参数   
-basedirectory {directoryname}    指定基础目录为以后相对的档案名称   
-injars {class_path}    指定要处理的应用程序jar,war,ear和目录   
-outjars {class_path}    指定处理完后要输出的jar,war,ear和目录的名称   
-libraryjars {classpath}    指定要处理的应用程序jar,war,ear和目录所需要的程序库文件   
-dontskipnonpubliclibraryclasses    指定不去忽略非公共的库类。   
-dontskipnonpubliclibraryclassmembers    指定不去忽略包可见的库类的成员。  
  
保留选项   
-keep {Modifier} {class_specification}    保护指定的类文件和类的成员   
-keepclassmembers {modifier} {class_specification}    保护指定类的成员，如果此类受到保护他们会保护的更好  
-keepclasseswithmembers {class_specification}    保护指定的类和类的成员，但条件是所有指定的类和类成员是要存在。/ 保留类和类中的成员，防止它们被混淆或移除，前提是指名的类中的成员必须存在，如果不存在则还是会混淆  
-keepnames {class_specification}    保护指定的类和类的成员的名称（如果他们不会压缩步骤中删除）   
-keepclassmembernames {class_specification}    保护指定的类的成员的名称（如果他们不会压缩步骤中删除）   
-keepclasseswithmembernames {class_specification}    保护指定的类和类的成员的名称，如果所有指定的类成员出席（在压缩步骤之后）   
-printseeds {filename}    列出类和类的成员-keep选项的清单，标准输出到给定的文件   
  
压缩   
-dontshrink    不压缩输入的类文件   
-printusage {filename}   
-whyareyoukeeping {class_specification}       
  
优化   
-dontoptimize    不优化输入的类文件   
-assumenosideeffects {class_specification}    优化时假设指定的方法，没有任何副作用   
-allowaccessmodification    优化时允许访问并修改有修饰符的类和类的成员   
  
混淆   
-dontobfuscate    不混淆输入的类文件   
-printmapping {filename}   
-applymapping {filename}    重用映射增加混淆   
-obfuscationdictionary {filename}    使用给定文件中的关键字作为要混淆方法的名称   
-overloadaggressively    混淆时应用侵入式重载   
-useuniqueclassmembernames    确定统一的混淆类的成员名称来增加混淆   
-flattenpackagehierarchy {package_name}    重新包装所有重命名的包并放在给定的单一包中   
-repackageclass {package_name}    重新包装所有重命名的类文件中放在给定的单一包中   
-dontusemixedcaseclassnames    混淆时不会产生形形色色的类名   
-keepattributes {attribute_name,...}    保护给定的可选属性，例如LineNumberTable, LocalVariableTable, SourceFile, Deprecated, Synthetic, Signature, and   
  
InnerClasses.   
-renamesourcefileattribute {string}    设置源文件中给定的字符串常量  
```

### gradle 中的将混淆文件打包到aar中的方法
默认情况下，我们使用Android studio 的gradle 打包方式生成的aar文件中是不包含混淆配置的，因此我们需要使用gradle的consumerProguardFiles方法将混淆文件打包到aar中。
```
```
然后解压之后解压会发现其中多了一个proguard.txt文件


#### 参考资料
- [proguard混淆](https://www.jianshu.com/p/3d89e3c2a081)