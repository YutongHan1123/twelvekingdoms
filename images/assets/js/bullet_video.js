function myFunction() {
  var x = document.getElementById("bullet-select");
  var i = x.selectedIndex;
  var vid = document.getElementById("myVideo");
  document.getElementById("myVideoComment").innerHTML = "The minute in <span class='bullet_episode'>" + x.options[i].text + "</span> with biggesr number of bullet screen comments.";
  // isSupp = vid.canPlayType("video/mp4");
  if (i == 0) {
    vid.src = "video/01.mp4";
    document.getElementById("description_video").innerHTML = "New text!";
  } else if (i == 1) {
    vid.src = "video/02.mp4";
    document.getElementById("description_video").innerHTML = "test2";
  } else if (i == 2) {
    vid.src = "video/03.mp4";
    document.getElementById("description_video").innerHTML = "test3";
  } else if (i == 3) {
    vid.src = "video/04.mp4";
  } else if (i == 4) {
    vid.src = "video/05.mp4";
  } else if (i == 5) {
    vid.src = "video/06.mp4";
  } else if (i == 6) {
    vid.src = "video/07.mp4";
  } else if (i == 7) {
    vid.src = "video/08.mp4";
  } else if (i == 8) {
    vid.src = "video/09.mp4";
  } else if (i == 9) {
    vid.src = "video/10.mp4";
  } else if (i == 10) {
    vid.src = "video/11.mp4";
  }
  vid.load();
}
