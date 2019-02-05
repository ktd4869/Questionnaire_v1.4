function getspanslabels(htmlstring) {
    // this function will: take a current string, abstract spans and labels
    var cons = $(htmlstring).find("[id^='cons']")
    var ret = $.map(cons, function (c) {
        var rets = "";
        var label = c.className.replace("pointer", "").replace("cons", "").trim();
        rets += label;
        var idarr = c.id.split("-");
        rets += "-";
        rets += idarr[1] + "-";
        rets += idarr[2];
        return rets;
    })
    return ret;
}

function getsentends(htmlstring) {
    // this function will: take a current string, abstract spans and labels
    var ps = $(htmlstring).find("p");
    var ret = $.map(ps, function (p) {
        return p.id.slice(1);
    });

    return ret;
}

function LoadFile() {
    // var countList = LoadJson();
    // var max = countList.length, min = 1;
    var max = 200, min = 1;
    var arr = [];
    var articleid = [];
    var ranNum = 2;
    for (var i = min; i < max + 1; i++) {
        // arr.push(Number(countList[i-1]['id'])+1);
        arr.push(i);
    }
    for (var i = 0; i < ranNum; i++) {
        var ran = Math.floor(Math.random() * (arr.length + - i));
        articleid.push(arr[ran]);
        arr[ran] = arr[arr.length - i - 1];
        console.log(articleid[i] + "_html");
    }

    //$("#"+1+"_txt").load("testing_json/"+articleid[0]+"_txt.html")

    for (var i2 = 1; i2 < ranNum + 1; i2++) {
        $("#" + i2 + "_txt").attr('id', articleid[i2 - 1] + "_txt");
        // local modify
        // $("#" + articleid[i2 - 1] + "_txt").load("https://cdn.jsdelivr.net/gh/ktd4869/ktd4869.github.io@3.0/testing_json/" + articleid[i2 - 1] + "_txt.html");
        //修改为http
        $("#" + articleid[i2 - 1] + "_txt").load("https://cdn.jsdelivr.net/gh/ktd4869/ktd4869.github.io@4.1/html/" + articleid[i2 - 1] + "_txt.html");
        // $.get("html/"+articleid[i2 - 1]+"_txt.html", function(data) {
        //     $("#"+articleid[i2 - 1]+"_txt").html(data);
        //  }, 'text');
    }

    $("#testButtonAboutAr1").click(function () {
		console.log("GOOD!");
		$("#htmlContainerAbout").addClass("border-success");
		$("#testButtonAboutAr1").addClass("btn-success").text("Completed!");
	});
	
	$("#testButtonAboutAr2").click(function () {
		console.log("GOOD!");
		$("#htmlContainerAbout").addClass("border-success");
		$("#testButtonAboutAr2").addClass("btn-success").text("Completed!");
	});

    $("#testButton1").click(function () {
        console.log("GOOD!");
        $("#htmlContainer1").addClass("border-success");
        $("#testButton1").addClass("btn-success").text("Completed!");
    });

    $("#testButton2").click(function () {
        console.log("GOOD!");
        $("#htmlContainer2").addClass("border-success");
        $("#testButton2").addClass("btn-success").text("Completed!");
    });

   

    $("#testButtonAbout").click(function () {
        console.log("GOOD!");
        $("#htmlContainerAbout").addClass("border-success");
        $("#testButtonAbout").addClass("btn-success").text("Completed!");
    });

    $("#submitButton").click(function () {

        var ret = {};
        //ret["gender"] = $("#gender").val();
        //ret["age"] = $("#age").val();
        //ret["education"] = $("#education").val();
        //ret["background"] = $("#background").val();

        for (var i = 1; i < articleid.length + 1; i++) {
            var html = $(document.getElementById(articleid[i - 1] + "_txt"));
            var spanslabels = getspanslabels(html);
            // console.log(spanslabels);
            ret[articleid[i - 1] + "_txt"] = spanslabels;
        }

        $("#finalsubmission").val(JSON.stringify(ret));

        $.each(articleid,function(index,info){
            countList[info]['view'] += 1;
            console.log("123: "+countList[info]['view']);
        });

        $.ajax({
            type:'post',
            url:'http://47.91.41.232/Questionnaire_v1.3/src/SetView.php',//修改为http
            dataType:'text',
            data:{'id1':articleid[0],'id2':articleid[1],'view1':countList[articleid[0]]['view'],'view2':countList[articleid[1]]['view']},
            success:function(data){
                console.log(data);
            }
        });

        console.log(ret);
    });
}

function LoadJson(){
    var countList = new Array();
    $.ajaxSettings.async = false;
    $.ajax({
        type:'post',
        url:'http://47.91.41.232/Questionnaire_v1.3/src/getJSON.php',//修改为http
        success:function(data){
            console.log("database successful");
            $.each(data,function(index,info){
                if(info['view'] < 3){
                    temp = {};
                    temp['id'] = info['id'];
                    temp['view'] = info['view'];
                    countList.push(temp);
                }
            });
        }
    });
    
    return countList;
}

var firstInit = 0;//to set listener to all tok id

$(document).ready(function () {
    console.log("loading stuff...");
    LoadFile();

    /*
        var max=10, min=1;
        var arr=[];
        var articleid=[];
        var ranNum=5
        for(var i=min;i<max+1;i++){
            arr.push(i);
        };
        for(var i=0;i<ranNum;i++){
            var ran = Math.floor(Math.random() * (arr.length - i));
            articleid.push(arr[ran]);
            arr[ran] = arr[arr.length - i - 1];
        };
    
        //$("#"+1+"_txt").load("testing_json/"+articleid[0]+"_txt.html")
    	
        for (var j=1;j<ranNum+1;j++){
            $("#"+j+"_txt").load("testing_json/"+articleid[j-1]+"_txt.html")
        };
            */
    var highlighting = false;

    // id represents the card id that this range appears in.
    var range = { start: -1, end: -1, id: "" };

    function resetrange() {
        range = { start: -1, end: -1, id: "" };
        highlightrange();
    }

    function highlightrange() {

        $(".highlightsingle").removeClass("highlightsingle");
        $(".highlighted").removeClass("highlighted");
        $(".highlightstart").removeClass("highlightstart");
        $(".highlightend").removeClass("highlightend");
        if (range.start == -1 && range.end == -1) {
            // do nothing.
        } else {
            for (var i = range.start; i <= range.end; i++) {
                var el = document.getElementById("tok-" + range.id + "-" + i);
                if (i == range.start && i == range.end) {
                    $(el).addClass("highlightsingle");
                }
                else if (i == range.start) {
                    $(el).addClass("highlightstart");
                }
                else if (i == range.end) {
                    $(el).addClass("highlightend");
                } else {
                    $(el).addClass("highlighted");
                }
            }
        }
    }

    /** This returns true if the range has been changed. **/
    function updaterange(id) {
        console.log(id);
        var docid = id.split("-")[1];
        var intid = parseInt(id.split("-")[2]);
        var ret = false;
        if (range.start == -1 && range.end == -1) {
            range.start = intid;
            range.end = intid;
            range.id = docid;
            ret = true;
        }else if (range.end - intid < 0 && (range.start - intid) > -5 && (range.start - intid) <= 0) {
            range.end = intid;
            ret = true;
        }else if(range.end - intid > 0 && (range.start - intid) > -5 && (range.start - intid) <= 0){
            range.end = intid;
            ret = true;
        }

        highlightrange();

        return ret;
    }

    // click on anything but a letter, and they hide.
    $(document).mousedown(function (e) {

        var hasclass = $(e.target).hasClass("labelbutton");

        if (firstInit == 0) {
            loadtok();
            firstInit = 1;
        }

        if (!e.target.id.startsWith("tok") && !hasclass) {
            console.log("extraneous click");
            $('.popover').popover('hide');

            resetrange();
        }
    });

    //this will set listeners to all tokens
    function loadtok() {
        console.log("loadtok called...");

        $(document).mouseup(function (event) {
            highlighting = false;
        });

        $("[id^=tok]").popover("dispose");

        $("[id^=tok]").popover({
            placement: "bottom",
            content: function () {
                var html = $("#buttons").html();
                var out = " <div id='popover" + $(this)[0].id + "'>" + html + "</div>";
                return out;
            },
            title: function () {
                var t = $(this)[0];
                return "Labeled: " + t.className;
            },
            html: true,
            trigger: "focus"
        });

        //$("[id^=tok]").off("mouseup");

        $("[id^=tok]").mouseenter(function (event) {
            if (highlighting && updaterange(this.id)) {
                $(this).addClass("highlighted");
            }
        });

        $("[id^=tok]").mouseup(function (event) {
            // only toggle on the left click.
            if (event.which == 1) {
                $("[id^=tok]").not($(this)).popover('hide');
                $(this).popover("toggle");
            }
            highlighting = false;

        });

        $("[id^=tok]").mousedown(function (event) {
            highlighting = true;
            resetrange();
            updaterange(this.id);
            console.log(this.id);
        });

        $("div.text")
            .mouseenter(function () { })
            .mouseleave(function () {
                highlighting = false;
            });


        // on right click, change label to nothing.
        $("[id^=tok]").contextmenu(function (event) {
            event.preventDefault();
            var span = event.currentTarget;
            console.log("Right clicked on " + span.id);
            removelabel(span);
        });
    }

    $("#dictbutton").click(function () {
        // ideal: store definition as part of the span, just switch between attributes.
        console.log("Do it locally!")
    });

    // this runs when you click on a single button.
    $("body").on("click", '.popover button', function (event) {
        var buttonvalue = $(this)[0].value;

        //var spanid = $(this).parents("[id^=popovertok]")[0].id;

        console.log(event);

        var sentid = range.id;

        console.log(range.id);
        console.log("Clicked on a button..." + buttonvalue);
        console.log(range);

        var startid = "tok-" + range.id + "-" + range.start;
        var endid = "tok-" + range.id + "-" + (range.end + 1);

        $("[id^=tok]").popover("hide");
        resetrange();

        addlabel(sentid, startid, endid, buttonvalue);
    });

    function getParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    // given a span id (e.g. tok-4), return the integer
    function getnum(spanid) {
        return parseInt(spanid.split("-").slice(-1)[0]);
    }

    function checkoverlap(spana, spanb) {

        var ssa = spana.split("-");
        var ssb = spanb.split("-");
        var a1 = parseInt(ssa[1]);
        var a2 = parseInt(ssa[2]) - 1;
        var b1 = parseInt(ssb[1]);
        var b2 = parseInt(ssb[2]) - 1;

        return a1 <= b2 && b1 <= a2;
    }

    function getsentids() {
        var ids = $.map($(".text"), function (n, i) {
            return n.id;
        });
        return ids;
    }

    // run this function when you click on a token.
    function addlabel(sentid, starttokid, endtokid, newclass) {
        sentid += "_txt";
        console.log("Adding " + newclass + " to " + starttokid + "---" + endtokid + ", sentid=" + sentid);

        if (newclass == "O") {
            return;
        }

        var start = getnum(starttokid);
        var end = getnum(endtokid);

        // here, instead of going to the server, we just update the javascript immediately.
        var cardtext = $(document.getElementById(sentid));
        console.log(cardtext);
        var toks = cardtext.find("[id^='tok']");
        var spanslabels = getspanslabels(cardtext);
        var sentends = getsentends(cardtext);

        // console.log(sentends);

        // get all the spans here.
        var wordtoks = toks.slice(start, end);

        var name = wordtoks.toArray().reduce(function (sum, value) {
            return sum + " " + $(value).text();
        }, "");

        var alltext = toks.toArray().reduce(function (sum, value) {
            return sum + " " + $(value).text();
        }, "");

        // var temp = toks.toArray();
        // var alltext = "";
        //
        // for(var c=0;c<temp.length;c++){
        //     if(c===temp.length-1){
        //         alltext+=$(temp[c]).text();
        //     }else if(c===0){
        //         alltext+=" "+$(temp[c]).text();
        //     }
        //     else{
        //         alltext+=$(temp[c]).text()+" ";
        //     }
        // }

        var newspans = [];
        var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\–|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\—]/g;
        if (end - start == 1 && name.length < 10) {
            name = name.replace(/\ /g,"");
            name = name.replace(/\.$/g, "");
            name = name.replace(/\(/g, "");
            name = name.replace(/\)/g, "");
            name = name.replace(/\"/g, "");
            name = name.replace(/\+/g, "");
            name = name.replace(/\'$/g, "");
            name = name.replace(/^\'/g, "");
            name = name.replace(/\,$/g, "");
            name = name.replace(/\?/g, "");
            name = name.replace(/\!/g, "");
        }else{
            name = name.substring(1,name.length);
        }
        console.log(name);
        if (reg.test(name)) {
            alltext.replace(new RegExp(name, "g"), function (match, offset, string) {
                var count = (alltext.slice(0, offset).match(/ /g) || []).length - 1;
                console.log(count);
                var newspanlabel = newclass + "-" + count + "-" + (count + end - start);
                newspans.push(newspanlabel);
                return -1;
            });
        } else {
            alltext.replace(new RegExp('\\b' + name + '\\b', "g"), function (match, offset, string) {
                var count = (alltext.slice(0, offset).match(/ /g) || []).length - 1;
                console.log(count);
                var newspanlabel = newclass + "-" + count + "-" + (count + end - start);
                newspans.push(newspanlabel);
                return -1;
            });
        }
        // console.log(new RegExp(name,"g"));
        // console.log(alltext.replace(new RegExp('\\b'+name+'\\b',"g"), "*****"));
        console.log(newspans);

        for (var k = 0; k < newspans.length; k++) {

            var newspanlabel = newspans[k];

            var removed = false;
            var overlap = false;
            var removethese = [];
            $.each(spanslabels, function (i, old) {
                // can we add this???
                if (checkoverlap(newspanlabel, old)) {
                    overlap = true;
                    var ssa = newspanlabel.split("-");
                    var ssb = old.split("-");
                    var a = parseInt(ssa[1]);
                    var b = parseInt(ssa[2]);
                    var c = parseInt(ssb[1]);
                    var d = parseInt(ssb[2]);

                    if (a == c && b >= d) {
                        // remove old from the list
                        removed = true;
                        removethese.push(i);
                    } else if (a <= c && b == d) {
                        // remove old from the list
                        removed = true;
                        removethese.push(i);
                    }
                }
            });


            // remove elements that have been identified.
            // d is the index of the element in spanslabels.
            $.each(removethese, function (i, d) {
                spanslabels.splice(d, 1);
            });

            // add if: no overlap
            // or if: overlap && removed.
            if (!overlap || (overlap && removed)) {
                spanslabels.push(newspanlabel);
                console.log("push");
            }
        }

        var newhtml = producetext(toks, spanslabels, sentends);

        cardtext.html(newhtml);

        $.each(getsentids(), function (i, d) {
            var old = $("#" + d).html();
            $("#" + d).html(old);
        });
        console.log("each loop");
        loadtok();
    }

    // Given a span, remove the label.
    function removelabel(span) {

        $("#savebutton").html("<span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=\"true\"></span> Save");
        $("#savebutton").css({ "border-color": "#c00" });

        var sentid = $(span).parents(".card-body")[0].id;

        var cardtext = $("#" + sentid);
        var toks = cardtext.find("[id^='tok']");
        var spanslabels = getspanslabels(cardtext);
        var sentends = getsentends(cardtext);

        // returns just the number of the token. tok-4, returns 4.
        var tokid = getnum(span.id);

        console.log("Removing label from: " + sentid + ":" + tokid);

        $.each(spanslabels, function (i, d) {
            var sd = d.split("-");
            var label = sd[0];
            var start = parseInt(sd[1]);
            var end = parseInt(sd[2]);

            if (tokid == start && tokid == end - 1) {
                // remove whole span.
                spanslabels[i] = "";
            }
            else if (tokid >= start && tokid <= end) {
                spanslabels[i] = "";
            }

            // otherwise, just don't do anything.

        });

        console.log(spanslabels);

        var newhtml = producetext(toks, spanslabels, sentends);

        cardtext.html(newhtml);

        $.each(getsentids(), function (i, d) {
            var old = $("#" + d).html();
            $("#" + d).html(old);
        });

        loadtok();
    }

    function producetext(toks, spanslabels, sentends) {
        // this will: create a new html string with additional spans and labels added or removed.

        var stoks = $.map(toks, function (c) {
            return c.outerHTML;
        });

        $.each(spanslabels, function (i, d) {
            var sd = d.split("-");
            var label = sd[0];
            var start = sd[1];
            var end = sd[2];
            var newid = d.replace(label, "cons");
            var template = "<span class='LAB pointer cons' id='ID'>".replace("LAB", label).replace("ID", newid);

            stoks[start] = template + stoks[start];
            stoks[end - 1] += "</span>";
        });

        stoks[0] = "<p id='p0'>" + stoks[0];
        $.each(sentends, function (i, d) {
            if (d > 0 && d < stoks.length) {
                stoks[d] = "</p><p id='p" + d + "'>" + stoks[d];
            }
        });
        return stoks.join("") + "</p>";
    }
});