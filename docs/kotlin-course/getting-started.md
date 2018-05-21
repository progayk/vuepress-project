---
title: 'Getting Started'
sidebarDepth: 3
---

# Getting Started


## Credits

The link of this course is [on here](https://www.udemy.com/sifirdan-ileri-seviyeye-kotlin-ve-android-kursu/learn/v4/overview).

## Content

[[toc]]

## What is Kotlin and General Terms

## Set up Environment

### Install Java

```bash
$ sudo add-apt-repository ppa:webupd8team/java
$ sudo apt update
$ sudo apt install oracle-java8-set-default
```

Check if everything is OK:

```bash
java -version
```

### Install IntelliJ Idea

Download from the official page.

```bash
sudo tar xf ideaIU-2018.1.4.tar.gz -C /opt/
```

```bash
cd /opt/-*/bin
./idea.sh
```

I installed ultimate version since I have an account :)

### Install Android Studio

Install `.tar` file from the official site.

Extract it under `/usr/local/`

To launch Android Studio, open a terminal, navigate to the `android-studio/bin/` directory, and execute `studio.sh`


## Create First Project

Open the **IntelliJ Idea** and create a new `Kotlin` application.

Create the first file under `src` folder with name `firstProject.kt` and write `main` and hit TAB. You will see that the **method** is created automatically. This is main function that will run when the app is executed. 

```kotlin
fun main(args: Array<String>) {
        
}
```

## Variables

* byte
* short
* int
* long
* float
* double

### Integers

```kotlin
fun main(args: Array<String>) {
    // define Integer
    var num : Int
    num = 5

    println(num)

}
```

### Bytes

```kotlin
fun main(args: Array<String>) {
    var byteMin : Byte = Byte.MIN_VALUE
    var byteMax : Byte = Byte.MAX_VALUE
    println("The highest value of Byte : " + byteMin)
    println("The lowest value of Byte : " + byteMax)
}
```
**output:**
```
/usr/lib/jvm/java-8-oracle/bin/java ...
The highest value of Byte : -128
The lowest value of Byte : 127

Process finished with exit code 0
```

::: tip
If you try to put a value more than `127` or less than `-128` into `Byte` it will throw an **error**.
:::

### Short

```kotlin
fun main(args: Array<String>) {
    // Byte
    var byteMin : Byte = Byte.MIN_VALUE
    var byteMax : Byte = Byte.MAX_VALUE
    println("The highest value of Byte : " + byteMin)  // 8 bit
    println("The lowest value of Byte : " + byteMax)
    // Short
    var shortMin : Short = Short.MIN_VALUE
    var shortMax : Short = Short.MAX_VALUE

    println("The highest value of Short : " + shortMin) // 16 bit
    println("The lowest value of Short : " + shortMax)
    // int
    var intMin : Int = Int.MIN_VALUE
    var intMax : Int = Int.MAX_VALUE

    println("The highest value of Int : " + intMin) // 32 bit
    println("The lowest value of Int : " + intMax)
    // Long
    var longMin : Long = Long.MIN_VALUE
    var longMax : Long = Long.MAX_VALUE

    println("The highest value of Long : " + longMin)
    println("The lowest value of Long : " + longMax)
    // Float
    var floatMin : Float = Float.MIN_VALUE
    var floatMax : Float = Float.MAX_VALUE

    println("The highest value of Float : " + floatMin)  // 32 bit
    println("The lowest value of Float : " + floatMax)
    // Double
    var doubleMin : Double = Double.MIN_VALUE
    var doubleMax : Double = Double.MAX_VALUE

    print("The highest value of Double $doubleMin: \n")  // 64 bit
    println("The lowest value of Double : ${doubleMax}")
}
```

## Casting

```kotlin
fun main(args: Array<String>) {
    var myShort : Short
    var myInt : Int = 23453

    myShort = myInt.toShort()
    println("myshort is $myShort")

    var myInt2 : Int = 45000
    var myShort2 : Short

    myShort2 = myInt2.toShort()
    println("My int is " + myShort2)

    var myDouble : Double = 50.345455
    var myInt3 : Int

    myInt3 = myDouble.toInt()
    println("My double converted to int and it has lost lots of data :( result: " + myInt3)
    
}
```
**output**
```
/usr/lib/jvm/java-8-oracle/bin/java ...
myshort is 23453
My int is -20536
My double converted to int and it has lost lots of data :( result: 50

Process finished with exit code 0
```
::: tip
When we try to `cast` a data to another with bigger value that it can take, the data will be currepted
:::

### Shortcuts

```kotlin
var myLong = 234578324L
var myFloat = 234.234523F
```