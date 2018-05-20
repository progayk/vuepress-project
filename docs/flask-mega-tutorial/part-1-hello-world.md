---
title: 'Flask Mega Tutorial'
sidebarDepth: 3
---

# Flask Mega Tutorial


## Credits

The link of this course is [on here](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world).


## Content

[[toc]]

## Installing Python

you can download an installer from the [Python official website](http://python.org/download/).

To make sure your Python installation is functional, you can open a terminal window and type `python3`, or if that does not work, just `python`. Here is what you should expect to see:

```python
$ python3
Python 3.5.2 (default, Nov 17 2016, 17:05:23)
[GCC 5.4.0 20160609] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> _
```

## Installing Flask

In Python, packages such as Flask are available in a public repository, from where anybody can download them and install them. The official Python package repository is called PyPI, which stands for Python Package Index (some people also refer to this repository as the "cheese shop"). Installing a package from [PyPI](https://pypi.python.org/pypi) is very simple, because Python comes with a tool called `pip` that does this work (in Python 2.7 pip does not come bundled with Python and needs to be installed separately).

To install a package on your machine, you use `pip` as follows:

```bash
pip install package-name
```

Python uses the concept of virtual environments. A virtual environment is a complete copy of the Python interpreter. When you install packages in a virtual environment, the system-wide Python interpreter is not affected, only the copy is.

Let's start by creating a directory where the project will live. I'm going to call this directory *microblog*, since that is the name of the application:

```bash
mkdir microblog
cd microblog
```

Then create a virtual environment, and activate it.

```bash
virtualenv venv
source venv/bin/activate
```

With this command, I'm asking Python to run the venv package, which creates a virtual environment named `venv`.

When you activate a virtual environment, the configuration of your terminal session is modified so that the Python interpreter stored inside it is the one that is invoked when you type `python`. Also, the terminal prompt is modified to include the name of the activated virtual environment. The changes made to your terminal session are all temporary and private to that session, so they will not persist when you close the terminal window. 

Now that you have a virtual environment created and activated, you can finally install Flask in it:

```bash
(venv) $ pip install flask
```

If you want to confirm that your virtual environment now has Flask installed, you can start the Python interpreter and import Flask into it:

```python
>>> import flask
>>> _
```

## A "Hello, World" Flask Application

If you go to the Flask website, you are welcomed with a very simple example application that has just five lines of code. Instead of repeating that trivial example, I'm going to show you a slightly more elaborate one that will give you a good base structure for writing larger applications.

The application will exist in a package. In Python, a sub-directory that includes a `__init__.py` file is considered a package, and can be imported. When you import a package, the `__init__.py` executes and defines what symbols the package exposes to the outside world.

Let's create a package called `app`, that will host the application. Make sure you are in the **microblog** directory and then run the following command:

```bash
mkdir app
```
The `__init__.py` for the app package is going to contain the following code:

```python
from flask import Flask

app = Flask(__name__)

from app import routes
```


The script above simply creates the application object as an instance of class Flask imported from the flask package. The `__name__` variable passed to the Flask class is a Python predefined variable, which is set to the name of the module in which it is used. Flask uses the location of the module passed here as a starting point when it needs to load associated resources such as template files, which I will cover in Chapter 2. For all practical purposes, passing `__name__` is almost always going to configure Flask in the correct way. The application then imports the routes module, which doesn't exist yet.

One aspect that may seem confusing at first is that there are two entities named app. The app package is defined by the app directory and the `__init__.py` script, and is referenced in the from app import routes statement. The app variable is defined as an instance of class Flask in the `__init__.py` script, which makes it a member of the app package.

Another peculiarity is that the routes module is imported at the bottom and not at the top of the script as it is always done. The bottom import is a workaround to circular imports, a common problem with Flask applications. You are going to see that the routes module needs to import the app variable defined in this script, so putting one of the reciprocal imports at the bottom avoids the error that results from the mutual references between these two files.

So what goes in the `routes module` The routes are the different URLs that the application implements. In Flask, handlers for the application routes are written as Python functions, called view functions. View functions are mapped to one or more route URLs so that Flask knows what logic to execute when a client requests a given URL.

Here is your first view function, which you need to write in the new module named *app/routes.py*:

```python
from app import app

@app.route('/')
@app.route('/index')
def index():
    return "hello, world"
```

This view function is actually pretty simple, it just returns a greeting as a string. The two strange `@app.route` lines above the function are **decorators**, a unique feature of the Python language. A decorator modifies the function that follows it. A common pattern with decorators is to use them to register functions as callbacks for certain events. In this case, the `@app.route` decorator creates an association between the URL given as an argument and the function. In this example there are two decorators, which associate the URLs `/` and `/index` to this function. This means that when a web browser requests either of these two URLs, Flask is going to invoke this function and pass the return value of it back to the browser as a response. If this does not make complete sense yet, it will in a little bit when you run this application.

To complete the application, you need to have a Python script at the top-level that defines the Flask application instance. Let's call this script *microblog.py*, and define it as a single line that imports the application instance:

```python
# microblog.py => main application module
from app import app
```

Remember the two `app` entities? Here you can see both together in the same sentence. The Flask application instance is called `app` and is a member of the `app` package. The `from app import app` statement imports the `app` variable that is a member of the `app` package. If you find this confusing, you can rename either the package or the variable to something else.

Just to make sure that you are doing everything correctly, below you can see a diagram of the project structure so far:

```
microblog/
  venv/
  app/
    __init__.py
    routes.py
  microblog.py
```

Believe it or not, this first version of the application is now complete! Before running it, though, Flask needs to be told how to import it, by setting the `FLASK_APP` environment variable:

```bash
export FLASK_APP=microblog.py
```

Are you ready to be blown away? You can run your first web application, with the following command:

```bash
(venv) $ flask run
 * Serving Flask app "microblog"
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

After the server initializes it will wait for client connections. The output from `flask run` indicates that the server is running on IP address 127.0.0.1, which is always the address of your own computer. This address is so common that is also has a simpler name that you may have seen before: localhost. Network servers listen for connections on a specific port number. Applications deployed on production web servers typically listen on port 443, or sometimes 80 if they do not implement encryption, but access to these ports require administration rights. Since this application is running in a development environment, Flask uses the freely available port 5000. Now open up your web browser and enter the following URL in the address field:

```
http://localhost:5000/
```

Alternatively you can use this other URL:

```
http://localhost:5000/index
```

Do you see the application route mappings in action? The first URL maps to /, while the second maps to /index. Both routes are associated with the only view function in the application, so they produce the same output, which is the string that the function returns. If you enter any other URL you will get an error, since only these two URLs are recognized by the application.

Congratulations, you have completed the first big step to become a web developer!