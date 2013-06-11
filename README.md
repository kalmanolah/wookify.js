wookify.js
========

'Translates' a string and/or all text in a jQuery selection from [Galactic Basic Standard](http://starwars.wikia.com/wiki/Galactic_Basic_Standard) to [Shyriiwook](http://starwars.wikia.com/wiki/Shyriiwook).

I thought it'd be a fun little script to have.

Documentation
-------------

Clone the repo, cd to the directory and copy the minified script to wherever you actually need it to be. Standard practice, really.

    git clone git://github.com/kalmanolah/wookify.js.git
    cp wookify.js/src/wookify.min.js /path/to/my/app/assets/js/

You could also save the good people at Github some bandwidth by doing:

    wget https://github.com/kalmanolah/wookify.js/raw/master/src/wookify.min.js

Please remember to make sure that jQuery is present before including this script.

Usage
-----

    <!-- ... Bunch of html before this point... -->
    <p>So then I said: "Your FACE is a wookie!"</p>
    <!-- ... Bunch of html beyond this point... -->

    <script src="js/jquery.min.js"></script>
    <script src="js/wookify.min.js"></script>
    <script>
        $(function() {
            $('p').wookify();
            // This will convert all of the text in all paragraphs on the page.

            var translated = $.wookify('This is a string of text.');
            // The var 'translated' now contains a converted string.
        });
    </script>

Dependencies
------------

- jQuery

License
-------

This hastily written script is MIT-licensed, but few people care. Check out the LICENSE file if you think you've got what it takes.
