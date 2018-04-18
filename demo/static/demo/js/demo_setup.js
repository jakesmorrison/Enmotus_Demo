var para_counter=0;
var prev=0;
var para1 = "Is a technology developed by Enmotus. Their software identifies the active data set of applications and dynamically allocates the appropriate storage resources in order to optimize performance.";
var word_arr_1 = para1.split(" ");
var element_arr_1 = [];

/**
 * Setting things up.
 */
$(document).ready(function() {
    for(i =0; i<word_arr_1.length; i++){
        $(".para1").append("<h4 class='myheading myfont para_style'>"+word_arr_1[i]+" </h4>")
    }

    $('h4', $(".para1")).each(function(){
        element_arr_1.push(this)
    });


    chart = spline_chart();

    pie_nvdimm_write = speedometer_chart('pie_nvdimm_write',"rgba(98, 157, 55,.80)","rgb(98, 157, 55)");
    pie_NVMe_write = speedometer_chart('pie_NVMe_write',"rgba(238,118,35,.80)","rgb(238,118,35)");

    container_stack1 = stack_chart(["rgba(98, 157, 55,.80)"],"rgb(98, 157, 55)",'container_stack1', '',[{data: [5]}, {data: [2]}, {data: [3]}]);
    container_stack2 = stack_chart(["rgba(238,118,35,.80)"],"rgb(0238,118,35)",'container_stack2', '',[{data: [5]}, {data: [2]}, {data: [3]}]);

    requestData();

});



/**
 *Change Fio command file.
 */
function change_fio(name){
    url_base = "{% url 'demo:new_fio' %}";
    params = {'fio': name}
    url = url_base +"?"+$.param(params);
    $.ajax({
        type: 'GET',
        url: url,
        success: function(msg) {
            $("#fio_read").removeClass("sel_button");
            $("#fio_write").removeClass("sel_button");
            $("#fio_7030").removeClass("sel_button");
            $("#fio_3070").removeClass("sel_button");

            $("#fio_read").addClass("my_button");
            $("#fio_write").addClass("my_button");
            $("#fio_7030").addClass("my_button");
            $("#fio_3070").addClass("my_button");

            $("#"+name).removeClass("my_button");
            $("#"+name).addClass("sel_button");
        }
    })

}
var counter = 1;
var avg_nvme_lat = 0;
var avg_nvme_bw = 0;
var avg_nvme_iops = 0;
var avg_nvdimm_lat = 0;
var avg_nvdimm_bw = 0;
var avg_nvdimm_iops = 0;
var arr = []

/**
 * Request data from the server, add it to the graph and set a timeout
 * to request again
 */
function requestData() {
    url_base = "{% url 'demo:get_data' %}";
    $.ajax({
        type: 'GET',
        url: url_base,
        success: function(msg) {
            var series = chart.series[0], shift = series.data.length > 40;
            chart.series[0].addPoint(msg.nvdimm_iops, false, shift);
            chart.series[1].addPoint(msg.nvme_iops, false, shift);

            container_stack1.series[0].setData([msg.nvdimm_lat]);
            container_stack2.series[0].setData([msg.nvme_lat]);

            max = 2500000;
            nvdimm_write_value = (msg.nvdimm_iops[1]/max)*100;
            NVMe_write_value = (msg.nvme_iops[1]/max)*100;

            pie_nvdimm_write.series[0].data[0].update(nvdimm_write_value);
            pie_nvdimm_write.series[0].data[1].update(100-nvdimm_write_value);
            pie_nvdimm_write.setTitle({text: numberWithCommas(msg.nvdimm_iops[1])+""});

            pie_NVMe_write.series[0].data[0].update(NVMe_write_value);
            pie_NVMe_write.series[0].data[1].update(100-NVMe_write_value);
            pie_NVMe_write.setTitle({text: numberWithCommas(msg.nvme_iops[1])+""});

            $("#lat_1_value").html(msg.nvdimm_lat+"µs");
            $("#lat_2_value").html(msg.nvme_lat+"µs");

            chart.redraw();


            //var series_spark1 = spark1.series[0], shift = series_spark1.data.length > 15;
            //spark1.series[0].addPoint(msg.arr3, false, shift);

            //var series_spark2 = spark2.series[0], shift = series_spark2.data.length > 15;
            //spark2.series[0].addPoint(msg.arr4, false, shift);


            //$('.square1').css("animation-duration",".5s");
            //$('.square2').css("animation-duration","3s");

            //$(".nvdimm_write_value").html(msg.arr[1]+" MBps")
            //$(".NVMe_write_value").html(msg.arr2[1]+" MBps")

            //spark1.redraw();
            //spark2.redraw();

            // For average and table display.
            sample_rate=10;
            if (counter===sample_rate){
                $("#nvme_lat").text(numberWithCommas(String(parseInt(avg_nvme_lat/sample_rate)))+"µs");
                $("#nvme_bw").text((String((avg_nvme_bw/15).toFixed(1)))+"GBps");
                $("#nvme_iops").text(numberWithCommas(String(parseInt(avg_nvme_iops/sample_rate)))+"");

                $("#nvdimm_lat").text(numberWithCommas(String(parseInt(avg_nvdimm_lat/sample_rate)))+"µs");
                $("#nvdimm_bw").text((String((avg_nvdimm_bw/15).toFixed(1)))+"GBps");
                $("#nvdimm_iops").text(numberWithCommas(String(parseInt(avg_nvdimm_iops/sample_rate)))+"");


                $("#lat_ratio").text((((avg_nvdimm_lat/15)/(avg_nvme_lat/15)).toFixed(1))+"X");
                $("#bw_ratio").text(String(((avg_nvdimm_bw/15)/(avg_nvme_bw/15)).toFixed(1))+"X");
                $("#iops_ratio").text((((avg_nvdimm_iops/15)/(avg_nvme_iops/15)).toFixed(1))+"X");

                counter = 0;
                avg_nvme_lat = 0;
                avg_nvme_bw = 0;
                avg_nvme_iops = 0;

                avg_nvdimm_lat = 0;
                avg_nvdimm_bw = 0;
                avg_nvdimm_iops = 0;
            }

            avg_nvme_lat = avg_nvme_lat+msg.nvme_lat;
            avg_nvme_bw = avg_nvme_bw + parseFloat(msg.nvme_bw);
            avg_nvme_iops = avg_nvme_iops+msg.nvme_iops[1];

            avg_nvdimm_lat = avg_nvdimm_lat+msg.nvdimm_lat;
            avg_nvdimm_bw = avg_nvdimm_bw + parseFloat(msg.nvdimm_bw);
            avg_nvdimm_iops = avg_nvdimm_iops+msg.nvdimm_iops[1];


            counter = counter + 1;
            setTimeout(requestData, 1600);
        }
    });
}



$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Change text color to make it pop. Didnt turn out well so it is not in use.
 */
//setInterval(change_text,1000)
function change_text(){
    if(para_counter>word_arr_1.length){
        prev.removeClass('change_color');
        para_counter=0;
        prev=0;
    }
    if(prev!=0){
        prev.removeClass('change_color');
    }
    $(element_arr_1[para_counter]).addClass('change_color');
    prev = $(element_arr_1[para_counter]);
    para_counter++;

}


/**
 * Custom Zoom
 */
$("#slider").slider({
    orientation: "vertical",
    value:1,
    min: .80,
    max: 1.20,
    step: .01,
    slide: function( event, ui ) {
        $(".mybody").css("zoom",ui.value)
    }
});

function close_info(){
    $(".popup").removeClass("display_yes")
    $(".popup").addClass("display_no")
}



var fio_info_1 = ["direct=1","randrepeat=0","ioengine=libaio","runtime=60","size=12G","group_reporting=1","ramp_time=2","rw=randread","bs=4k","rwmixread=100","rwmixwrite=0","numjobs=16","iodepth=16","loops=100"]
var fio_info_2 = ["direct=1","randrepeat=0","ioengine=libaio","runtime=60","size=12G","group_reporting=1","ramp_time=2","rw=randwrite","bs=4k","rwmixread=0","rwmixwrite=100","numjobs=16","iodepth=16","loops=100"]
var fio_info_3 = ["direct=1","randrepeat=0","ioengine=libaio","runtime=60","size=12G","group_reporting=1","ramp_time=2","rw=randread","bs=4k","rwmixread=70","rwmixwrite=30","numjobs=16","iodepth=16","loops=100"]
var fio_info_4 = ["direct=1","randrepeat=0","ioengine=libaio","runtime=60","size=12G","group_reporting=1","ramp_time=2","rw=randwrite","bs=4k","rwmixread=30","rwmixwrite=70","numjobs=16","iodepth=16","loops=100"]



function open_info(value){
    $("#fio_info").html("");
    if(value === "number_1"){
        $("#fio_info").append("<h3 class='myheadings myfont popup_text' style=''>High Yield IOPS (Random Read)</h3>")
        $("#fio_info").append("<hr>")

        <!--$("#fio_info").append("<h4 class='myheadings myfont popup_text' style=''>Random 4k Reads Multi Job</h4>")-->
        for(i =0; i<fio_info_1.length; i++){
            $("#fio_info").append("<h4 class='myheadings myfont popup_text'>"+fio_info_1[i]+"</h4>")
        }
    }
    else if(value === "number_2"){
        $("#fio_info").append("<h3 class='myheadings myfont popup_text' style='text-decoration: underline;'>Random 4KB Writes Multi Job</h3>")
        for(i =0; i<fio_info_2.length; i++){
            $("#fio_info").append("<h4 class='myheadings myfont popup_text'>"+fio_info_2[i]+"</h4>")
        }
    }
    else if(value === "number_3"){
        $("#fio_info").append("<h3 class='myheadings myfont popup_text' style='text-decoration: underline;'>Random 128KB Reads Multi Job</h3>")
        for(i =0; i<fio_info_3.length; i++){
            $("#fio_info").append("<h4 class='myheadings myfont popup_text'>"+fio_info_3[i]+"</h4>")
        }
    }
    else if(value === "number_4"){
        $("#fio_info").append("<h3 class='myheadings myfont popup_text' style='text-decoration: underline;'>Random 128KB Writes Multi Job</h3>")
        for(i =0; i<fio_info_4.length; i++){
            $("#fio_info").append("<h4 class='myheadings myfont popup_text'>"+fio_info_4[i]+"</h4>")
        }
    }

    $(".popup").removeClass("display_no")
    $(".popup").addClass("display_yes")
}