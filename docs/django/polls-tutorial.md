---
title: 'Polls Tutorial'
sidebarDepth: 3
---

# Polls Tutorial


## Credits

The link of this tutorial is [on here](https://docs.djangoproject.com/en/2.1/intro/tutorial01/).


## Content

[[toc]]

## Installing Django

Before install `django` it's better set up a virtual environment and activate it.

```bash
$ virtualenv venv
$ source venv/bin/activate
```

Install `django` with python package manager by the name `pip`.

```bash
(venv) pip install django
```

Check if django is installed proparly by instantiating a python in command-line.

```bash
(venv) ➜  polls-project python
Python 3.6.6 (default, Sep 12 2018, 18:26:19) 
[GCC 8.0.1 20180414 (experimental) [trunk revision 259383]] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import django
>>>
``` 
If you don't encounter any errors it means that django is installed successfully.

Create a project folder with desired name.

```bash
$ mkdir polls && cd polls
```

## Creating A Project

We need to auto-generate some code that establishes a Django project - a collection of settings for an instance of Django, including database configuration, Django-specific options and application-specific settings.

From the command line, cd into a directory where you’d like to store your code, then run:

```bash
$ django-admin startproject mysite
```

This will create a **mysite** directory in your current directory

::: tip Where should this code live?

If your background is in plain old PHP (with no use of modern frameworks), you’re probably used to putting code under the Web server’s document root (in a place such as /var/www). With Django, you don’t do that. It’s not a good idea to put any of this Python code within your Web server’s document root, because it risks the possibility that people may be able to view your code over the Web. That’s not good for security.

Put your code in some directory outside of the document root, such as /home/mycode.
:::


Let’s look at what startproject created:

```
mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        wsgi.py
```

These files are:

- The outer **mysite/** root directory is just a container for your project. Its name doesn’t matter to Django; you can rename it to anything you like.

- **manage.py**: A command-line utility that lets you interact with this Django project in various ways. You can read all the details about manage.py in [django-admin and manage.py](https://docs.djangoproject.com/en/2.1/ref/django-admin/).

- The inner **mysite/** directory is the actual Python package for your project. Its name is the Python package name you’ll need to use to import anything inside it (e.g. **mysite.urls**).

- `**mysite/__init__.py**`: An empty file that tells Python that this directory should be considered a Python package.

- **mysite/settings.py**: Settings/configuration for this Django project. [Django settings](https://docs.djangoproject.com/en/2.1/topics/settings/) will tell you all about how settings work.

- **mysite/urls.py**: The URL declarations for this Django project; a “table of contents” of your Django-powered site. You can read more about URLs in [URL dispatcher](https://docs.djangoproject.com/en/2.1/topics/http/urls/).

- **mysite/wsgi.py**: An entry-point for WSGI-compatible web servers to serve your project. See [How to deploy with WSGI](https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/) for more details.

## The development server

Let’s verify your Django project works. Change into the outer mysite directory, if you haven’t already, and run the following commands:

```bash
python manage.py runserver
```

You’ll see the following output on the command line:

```
Performing system checks...

System check identified no issues (0 silenced).

You have unapplied migrations; your app may not work properly until they are applied.
Run 'python manage.py migrate' to apply them.

October 01, 2018 - 15:50:53
Django version 2.1, using settings 'mysite.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

::: tip Note
Ignore the warning about unapplied database migrations for now; we’ll deal with the database shortly.
:::

You’ve started the Django development server, a lightweight Web server written purely in Python. THey’ve included this with Django so you can develop things rapidly, without having to deal with configuring a production server – such as Apache – until you’re ready for production.

Now that the server’s running, visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/) with your Web browser. You’ll see a “Congratulations!” page, with a rocket taking off. It worked!

::: tip Changing the port

By default, the runserver command starts the development server on the internal IP at port 8000.

If you want to change the server’s port, pass it as a command-line argument. For instance, this command starts the server on port 8080:

```bash
$ python manage.py runserver 8080
```

If you want to change the server’s IP, pass it along with the port. For example, to listen on all available public IPs (which is useful if you are running Vagrant or want to show off your work on other computers on the network), use:

```bash
$ python manage.py runserver 0:8000
```

**0** is a shortcut for **0.0.0.0**. Full docs for the development server can be found in the [runserver](https://docs.djangoproject.com/en/2.1/ref/django-admin/#django-admin-runserver) reference.
:::

::: tip Automatic reloading of runserver

The development server automatically reloads Python code for each request as needed. You don’t need to restart the server for code changes to take effect. However, some actions like adding files don’t trigger a restart, so you’ll have to restart the server in these cases.
:::

## Creating the Polls app

Now that your environment – a “project” – is set up, you’re set to start doing work.

Each application you write in Django consists of a Python package that follows a certain convention. Django comes with a utility that automatically generates the basic directory structure of an app, so you can focus on writing code rather than creating directories.

::: tip Projects vs. apps

What’s the difference between a project and an app? An app is a Web application that does something – e.g., a Weblog system, a database of public records or a simple poll app. A project is a collection of configuration and apps for a particular website. A project can contain multiple apps. An app can be in multiple projects.

:::

Your apps can live anywhere on your Python path. In this tutorial, we’ll create our poll app right next to your **manage.py** file so that it can be imported as its own top-level module, rather than a submodule of **mysite**.

To create your app, make sure you’re in the same directory as **manage.py** and type this command:

```bash
$ python manage.py startapp polls
```

That’ll create a directory polls, which is laid out like this:

```
polls/
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    views.py
```

This directory structure will house the **poll** application.

## Write your first view

Let’s write the first view. Open the file **polls/views.py** and put the following Python code in it:


```python
# polls/views.py
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
```

This is the simplest view possible in Django. To call the view, we need to map it to a URL - and for this we need a URLconf.

To create a URLconf in the polls directory, create a file called **urls.py**. Your app directory should now look like:

```
polls/
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    urls.py
    views.py
```

In the **polls/urls.py** file include the following code:

```python
# polls/urls.py

from django.urls import path

from . import views

urlpatterns = [
	path('', views.index, name='index')
]
```

The next step is to point the root URLconf at the **polls.urls** module. In **mysite/urls.py**, add an import for **django.urls.include** and insert an **include()** in the **urlpatterns** list, so you have:

```python
# mysite/urls.py
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
]
```

The **include()** function allows referencing other URLconfs. Whenever Django encounters **include()**, it chops off whatever part of the URL matched up to that point and sends the remaining string to the included URLconf for further processing.

The idea behind **include()** is to make it easy to plug-and-play URLs. Since polls are in their own URLconf (**polls/urls.py**), they can be placed under “/polls/”, or under “/fun_polls/”, or under “/content/polls/”, or any other path root, and the app will still work.

::: tip When to use include()

You should always use **include()** when you include other URL patterns. **admin.site.urls** is the only exception to this.
:::

You have now wired an **index** view into the URLconf. Lets verify it’s working, run the following command:

```bash
python manage.py runserver
```

Go to http://localhost:8000/polls/ in your browser, and you should see the text “Hello, world. You’re at the polls index.”, which you defined in the index view.

The **path()** function is passed four arguments, two required: **route** and **view**, and two optional: **kwargs**, and **name**. At this point, it’s worth reviewing what these arguments are for.

### path() argument: route

**route** is a string that contains a URL pattern. When processing a request, Django starts at the first pattern in **urlpatterns** and makes its way down the list, comparing the requested URL against each pattern until it finds one that matches.

Patterns don’t search GET and POST parameters, or the domain name. For example, in a request to [https://www.example.com/myapp/](https://www.example.com/myapp/), the URLconf will look for **myapp/**. In a request to [https://www.example.com/myapp/?page=3](https://www.example.com/myapp/?page=3), the URLconf will also look for **myapp/**.

### path() argument: view

When Django finds a matching pattern, it calls the specified view function with an **HttpRequest** object as the first argument and any “captured” values from the route as keyword arguments. We’ll give an example of this in a bit.

### path() argument: kwargs

Arbitrary keyword arguments can be passed in a dictionary to the target view. We aren’t going to use this feature of Django in the tutorial.

### path() argument: name

Naming your URL lets you refer to it unambiguously from elsewhere in Django, especially from within templates. This powerful feature allows you to make global changes to the URL patterns of your project while only touching a single file.


## Database setup

Now, open up **mysite/settings.py**. It’s a normal Python module with module-level variables representing Django settings.

By default, the configuration uses SQLite. If you’re new to databases, or you’re just interested in trying Django, this is the easiest choice. SQLite is included in Python, so you won’t need to install anything else to support your database. When starting your first real project, however, you may want to use a more scalable database like PostgreSQL, to avoid database-switching headaches down the road.

If you wish to use another database, install the appropriate [database bindings](https://docs.djangoproject.com/en/2.1/topics/install/#database-installation) and change the following keys in the **DATABASES** **'default'** item to match your database connection settings:

- **ENGINE** – Either **'django.db.backends.sqlite3'**, **'django.db.backends.postgresql'**, **'django.db.backends.mysql'**, or **'django.db.backends.oracle'**. Other backends are also available.

- **NAME** – The name of your database. If you’re using SQLite, the database will be a file on your computer; in that case, NAME should be the full absolute path, including filename, of that file. The default value, **os.path.join(BASE_DIR, 'db.sqlite3')**, will store the file in your project directory.

If you are not using SQLite as your database, additional settings such as [USER](https://docs.djangoproject.com/en/2.1/ref/settings/#std:setting-USER), [PASSWORD](https://docs.djangoproject.com/en/2.1/ref/settings/#std:setting-PASSWORD), and [HOST](https://docs.djangoproject.com/en/2.1/ref/settings/#std:setting-HOST) must be added. For more details, see the reference documentation for [DATABASES](https://docs.djangoproject.com/en/2.1/ref/settings/#std:setting-DATABASES).

::: tip For databases other than SQLite

If you’re using a database besides SQLite, make sure you’ve created a database by this point. Do that with **“CREATE DATABASE database_name;”** within your database’s interactive prompt.

Also make sure that the database user provided in **mysite/settings.py** has “create database” privileges. This allows automatic creation of a [test database](https://docs.djangoproject.com/en/2.1/topics/testing/overview/#the-test-database) which will be needed in a later tutorial.

If you’re using SQLite, you don’t need to create anything beforehand - the database file will be created automatically when it is needed.
:::

While you’re editing **mysite/settings.py**, set **TIME_ZONE** to your time zone.

Also, note the **INSTALLED_APPS** setting at the top of the file. That holds the names of all Django applications that are activated in this Django instance. Apps can be used in multiple projects, and you can package and distribute them for use by others in their projects.

By default, INSTALLED_APPS contains the following apps, all of which come with Django:

- **django.contrib.admin** – The admin site. You’ll use it shortly.
- **django.contrib.auth** – An authentication system.
- **django.contrib.contenttypes** – A framework for content types.
- **django.contrib.sessions** – A session framework.
- **django.contrib.messages** – A messaging framework.
- **django.contrib.staticfiles** – A framework for managing static files.

These applications are included by default as a convenience for the common case.

Some of these applications make use of at least one database table, though, so we need to create the tables in the database before we can use them. To do that, run the following command:

```bash
$ python manage.py migrate
```

The **migrate** command looks at the **INSTALLED_APPS** setting and creates any necessary database tables according to the database settings in your **mysite/settings.py** file and the database migrations shipped with the app (we’ll cover those later). You’ll see a message for each migration it applies. If you’re interested, run the command-line client for your database and type \dt (PostgreSQL), **SHOW TABLES;** (MySQL), **.schema** (SQLite), or **SELECT TABLE_NAME FROM USER_TABLES;** (Oracle) to display the tables Django created.

::: tip For the minimalists

Like we said above, the default applications are included for the common case, but not everybody needs them. If you don’t need any or all of them, feel free to comment-out or delete the appropriate line(s) from **INSTALLED_APPS** before running **migrate**. The **migrate** command will only run migrations for apps in **INSTALLED_APPS**.
:::

## Creating models

Now we’ll define your models – essentially, your database layout, with additional metadata.

::: tip Philosophy

A model is the single, definitive source of truth about your data. It contains the essential fields and behaviors of the data you’re storing. Django follows the DRY Principle. The goal is to define your data model in one place and automatically derive things from it.

This includes the migrations - unlike in Ruby On Rails, for example, migrations are entirely derived from your models file, and are essentially just a history that Django can roll through to update your database schema to match your current models.
:::

In our simple poll app, we’ll create two models: **Question** and **Choice**. A **Question** has a question and a publication date. A **Choice** has two fields: the text of the choice and a vote tally. Each **Choice** is associated with a **Question**.

These concepts are represented by simple Python classes. Edit the **polls/models.py** file so it looks like this:

```python
# polls/models.py
from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

The code is straightforward. Each model is represented by a class that subclasses [django.db.models.Model](https://docs.djangoproject.com/en/2.1/ref/models/instances/#django.db.models.Model). Each model has a number of class variables, each of which represents a database field in the model.

Each field is represented by an instance of a [Field](https://docs.djangoproject.com/en/2.1/ref/models/fields/#django.db.models.Field) class – e.g., [CharField](https://docs.djangoproject.com/en/2.1/ref/models/fields/#django.db.models.CharField) for character fields and [DateTimeField](https://docs.djangoproject.com/en/2.1/ref/models/fields/#django.db.models.DateTimeField) for datetimes. This tells Django what type of data each field holds.

The name of each **Field** instance (e.g. **question_text** or **pub_date**) is the field’s name, in machine-friendly format. You’ll use this value in your Python code, and your database will use it as the column name.

You can use an optional first positional argument to a **Field** to designate a human-readable name. That’s used in a couple of introspective parts of Django, and it doubles as documentation. If this field isn’t provided, Django will use the machine-readable name. In this example, we’ve only defined a human-readable name for **Question.pub_date**. For all other fields in this model, the field’s machine-readable name will suffice as its human-readable name.

Some **Field** classes have required arguments. **CharField**, for example, requires that you give it a **max_length**. That’s used not only in the database schema, but in validation, as we’ll soon see.

A **Field** can also have various optional arguments; in this case, we’ve set the [default](https://docs.djangoproject.com/en/2.1/ref/models/fields/#django.db.models.Field.default) value of votes to **0**.

**Finally, note a relationship is defined, using [ForeignKey](https://docs.djangoproject.com/en/2.1/ref/models/fields/#django.db.models.ForeignKey). That tells Django each **Choice** is related to a single **Question**. Django supports all the common database relationships: many-to-one, many-to-many, and one-to-one.

## Activating models

That small bit of model code gives Django a lot of information. With it, Django is able to:

- Create a database schema (**CREATE TABLE** statements) for this app.
- Create a Python database-access API for accessing **uestion** and **Choice** objects.

But first we need to tell our project that the **polls** app is installed.

::: tip Philosophy

Django apps are “pluggable”: You can use an app in multiple projects, and you can distribute apps, because they don’t have to be tied to a given Django installation.
:::

To include the app in our project, we need to add a reference to its configuration class in the [INSTALLED_APPS](https://docs.djangoproject.com/en/2.1/ref/settings/#std:setting-INSTALLED_APPS) setting. The **PollsConfig** class is in the **polls/apps.py** file, so its dotted path is **'polls.apps.PollsConfig'**. Edit the **mysite/settings.py** file and add that dotted path to the **INSTALLED_APPS** setting. It’ll look like this:

```python
# mysite/settings.py
INSTALLED_APPS = [
    'polls.apps.PollsConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

Now Django knows to include the **polls** app. Let’s run another command:

```bash
$ python manage.py makemigrations polls
```

You should see something similar to the following:

```
Migrations for 'polls':
  polls/migrations/0001_initial.py:
    - Create model Choice
    - Create model Question
    - Add field question to choice_text
```

By running **makemigrations**, you’re telling Django that you’ve made some changes to your models (in this case, you’ve made new ones) and that you’d like the changes to be stored as a migration.

Migrations are how Django stores changes to your models (and thus your database schema) - they’re just files on disk. You can read the migration for your new model if you like; it’s the file **polls/migrations/0001_initial.py**. Don’t worry, you’re not expected to read them every time Django makes one, but they’re designed to be human-editable in case you want to manually tweak how Django changes things.

There’s a command that will run the migrations for you and manage your database schema automatically - that’s called [migrate](https://docs.djangoproject.com/en/2.1/ref/django-admin/#django-admin-migrate), and we’ll come to it in a moment - but first, let’s see what SQL that migration would run. The [sqlmigrate](https://docs.djangoproject.com/en/2.1/ref/django-admin/#django-admin-sqlmigrate) command takes migration names and returns their SQL:

```
$ python manage.py sqlmigrate polls 0001
```

You should see something similar to the following (we’ve reformatted it for readability):

```sql
BEGIN;
--
-- Create model Choice
--
CREATE TABLE "polls_choice" (
    "id" serial NOT NULL PRIMARY KEY,
    "choice_text" varchar(200) NOT NULL,
    "votes" integer NOT NULL
);
--
-- Create model Question
--
CREATE TABLE "polls_question" (
    "id" serial NOT NULL PRIMARY KEY,
    "question_text" varchar(200) NOT NULL,
    "pub_date" timestamp with time zone NOT NULL
);
--
-- Add field question to choice
--
ALTER TABLE "polls_choice" ADD COLUMN "question_id" integer NOT NULL;
ALTER TABLE "polls_choice" ALTER COLUMN "question_id" DROP DEFAULT;
CREATE INDEX "polls_choice_7aa0f6ee" ON "polls_choice" ("question_id");
ALTER TABLE "polls_choice"
  ADD CONSTRAINT "polls_choice_question_id_246c99a640fbbd72_fk_polls_question_id"
    FOREIGN KEY ("question_id")
    REFERENCES "polls_question" ("id")
    DEFERRABLE INITIALLY DEFERRED;

COMMIT;
```

Note the following:

