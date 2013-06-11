/**
 * wookify.js
 *
 * 'Translates' a string and/or all text in a jQuery selection from [Galactic Basic Standard](http://starwars.wikia.com/wiki/Galactic_Basic_Standard) to [Shyriiwook](http://starwars.wikia.com/wiki/Shyriiwook).
 *
 * I thought it'd be a fun little script to have.
 *
 * Author: Kalman Olah (hello@kalmanolah.net)
 *
 * License:
 * MIT (See LICENSE)
 */
(function ($) {
    // Extend jQuery with wookify function
    $.wookify = $.fn.wookify = function (mixed) {

        // Set up the dictionary
        var dict = [
            'addik',
            'ahab',
            'an',
            'anta',
            'arra',
            'bacca',
            'becca',
            'bev',
            'bow',
            'chiir',
            'chit',
            'cuk',
            'drrl',
            'evge',
            'kabukk',
            'kazza',
            'kkata',
            'lanna',
            'mapia',
            'mum',
            'nik',
            'orral',
            'ova',
            'pirr',
            'porin',
            'raoao',
            'ryyhn',
            'tatha',
            'tharr',
            'tobuck',
            'urra',
            'warr',
            'ykam',
            'arri',
            'atti',
            'bus',
            'ciiir',
            'chal',
            'chew',
            'dry',
            'fro',
            'gaar',
            'geyy',
            'gra',
            'groz',
            'issh',
            'ji',
            'jow',
            'kalla',
            'kerri',
            'kit',
            'liak',
            'low',
            'lof',
            'malla',
            'nag',
            'ralr',
            'ror',
            'sal',
            'shor',
            'sno',
            'spet',
            'tar',
            'wrrl',
            'haaag',
            'awa',
            'yo',
            'agaaha',
            'ohh',
            'haa',
            'yaag',
            'wuahh',
            'huaahh',
            'muaahh',
            'ah',
            'wu',
            'aaa',
            'uma',
            'muawa',
            'hrrrrrnnnn',
            'ur',
            'oh',
            'brr',
            'kourasaa',
            'yukshin',
            'oid',
            'yurinal',
            'muaarga',
            'rooohu',
            'wwrcahwowhwa',
            'rahool',
            'rah-rear',
            'rahh',
            'mu',
            'hu',
            'mwa',
            'gaa',
            'Uoo',
            'waa',
            'moo',
            'wuyagah',
            'na',
            'aa-ooh-gaa',
            'a',
            'my',
            'agah',
            'ya',
            'mawah',
            'mua',
            'ga',
            'ma',
            'ahuma',
            'ooma',
            'whoaaaa',
            'maa',
            'warrgh',
            'aa',
            'oo',
            'gah',
            'roooarrgh',
            'roo',
            'hnn-rowr',
            'yrroonn',
            'nng',
            'rarrr',
            'rrargrarg',
            'rowr',
            'ahragh',
            'awf',
            'ahraroww',
            'rowh',
            'rohngr',
            'grgrff',
            'rf',
            'rrrrrruurgh',
            'arrggg',
            'ruggwah',
            'maw',
            'huah',
            'waag',
            'mam',
            'yaga',
            'ahyag',
            'ahyeg',
            'ha',
            'uwana',
            'goya',
            'uhama',
            'hoyaarg',
            'aga',
            'huwaga',
            'gu',
            'waagaa',
            'ahawag',
            'uwaga',
            'woohiee',
            'wugaga',
            'uwamma',
            'wa-ah',
            'woogaah',
            'huu',
            'hawaaaah',
            'hoooghhe',
            'waagh',
            'wuhu',
            'wa',
            'gaaa',
            'igra',
            'ann',
            'yu',
            'guwah',
            'mah',
            'oowhama',
            'guhaw',
            'ohyah',
            'huaah',
            'wuwu',
            'wyaaaaaa',
            'ruh',
            'yuow',
            'wyogg',
            'gwyaaaag',
            'wgha',
            'ryuraygu',
            'yuhahyrrararr',
            'huwaa',
            'muaa',
            'mumwa',
            'wooo',
            'hwa'
        ];

        // Helper function for executing a function on all non-empty text nodes in an element
        function recursiveTextCallback(element, callback) {
            if (element.childNodes.length > 0) {
                for (var i = 0; i < element.childNodes.length; i++) {
                    recursiveTextCallback(element.childNodes[i], callback);
                }
            }

            if (element.nodeType == Node.TEXT_NODE && /\S/.test(element.nodeValue)) {
                callback(element);
            }
        }

        // Helper function for capitalizing a string
        function capitalize(string) {
            return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
        }

        // Helper function for translating a string
        function translate(string) {

            var translated = string.replace(/[^\u0020-\u0040|\u005B-\u0060|\u007B-\u00BF]{2,}/g, function(a) {
                var random = Math.floor((Math.random() * dict.length));

                var translated_tmp = dict[random];

                // If the first letter of the string was capitalized, capitalize the translation
                if(a[0] == a[0].toUpperCase()) {
                    translated_tmp = capitalize(translated_tmp);
                }

                return translated_tmp;
            });

            /*// While the length of the translated string is less than that of the original string, add on more randomly
             // picked strings from the dictionary
             // This method is deprecated
             while(translated.length < string.length) {
             var random = Math.floor((Math.random() * dict.length) + 1);
             translated += ' ' + dict[random];
             }*/

            return translated;
        }

        // Helper function for translating the value of a text node
        function translateTextNode(element) {
            element.nodeValue = translate(element.nodeValue);
        }

        // If mixed is a string, return it translated
        if (typeof mixed == 'string') {
            return translate(mixed);
        }

        // If mixed is a jQuery selector, loop through all elements within and translate their contents
        if (typeof mixed == 'jQuery') {
            mixed.each(function () {
                recursiveTextCallback(element, translateTextNode);
            });
        }

        // If mixed was not provided, we're going to use 'this' since we've been called using the proper method
        this.each(function () {
            recursiveTextCallback(this, translateTextNode);
        })

        // Support chaining
        return this;
    };
})(jQuery);
