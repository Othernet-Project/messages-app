===================
Librarian Messaging
===================

Simple example app for Librarian that shows short messages broadcast to
Outernet users.

About this app
==============

Librarian apps are normal HTML pages (or a single page). JavaScript is used to
make these pages interactive much like in RIA (Rich Internet Applications).
Librarian currently provides a limited API for accessing locale and file
information, and this API is available as a jQuery plugin.

The file apps can access are those that are broadcast as so-called pure-file
broadcasts. They appear in the Librarian's file browser, and can also be
accessed using a JSON REST API. The Librarian's jQuery plugin provides means
for working with this REST API without worrying about the underlying format.

The example app uses the files API to retrieve a message data file in JSON
format, and show annoucements to the user. The main JavaScript module can be
found in ``js/main.js`` file. Please look at the file to find out more about
how the Librarian plugin is used.

The main application page is ``index.html``. This page loads the necessary
scripts and CSS. There is nothing special about that page. It's just a normal
HTML page, and there are no restrictions as to what it may contain. You can
also have mutliple HTML pages although this app does not take advantage of this
possibility.

App metadata
============

The ``app.json`` file contains the metadata about the app. 

The ``id`` key in the metadata must match the name of the app package (more on
packaging later).  The ``id`` should not contain spaces. As a general rule
stick to alphanumerics (A-Z, a-z, and 0-9) and underscore (_) as valid
characters for the ID. In future, we'll likely make this restriction mandatory
unless developers can think of a good reason why other characters should be
included.

The ``title`` field appears in the apps list in the "Apps" section in Librarian
to identify the app. Information such as ``version`` and ``author`` are also
shown below the title.

The ``description`` field is an object that has keys matching any of the
locales supported by Librarian. The default locale, ``en`` is mandatory. Each
locale maps to a String that represents the application description in that
language. This way, you are able to provide translations for your app's
description.

The ``icon_behavior`` key is a boolean key. If it is set to ``true``, Librarian
will load ``behavior.js`` script found in the app package right below the HTML
for the application icon. The intended use for behavior scripts is to present
notifications and modify icons to provide feedback about the app's state.

This is currently very limited because jQuery and Librarian API are **not**
loaded on the app list page. However, in future, Librarian will provide these
libraries so that behaviro scripts can take advantage of them.

We'll expand the documentation on behavior scripts once the app listing page is
equipped with jQuery and Librarian API libraries.

Icon
====

App icon is a simple .png file that is 128px square. The PNG may contain
transparency. Note, though, that Librarian CSS includes box shadow around the
icon, so making rounded corners with large radius or using shapes other than
square (e.g., circle, triangle) may yield visually unappealing results.

Packaging
=========

Apps are packaged as simple zip files. This can be done manually or using
scripts such as the one found in ``scripts/package.py``.

The requirements for app packages are:

- file name must be the same as app's ID with .zip extension
- must be unzippable with Python's zipfile standard library
- must contain ``index.html``
- must contain ``app.json``
- should contain ``incon.png``
- metadata must be in correct format

Other than what's listed above, you are free to organize the package contents
any way you like.
