let langIcons = {
  c: "<a href='https://en.wikipedia.org/wiki/C_(programming_language)'><img title='C' src='img/icons/c.svg'></a>",
  cpp: "<a href='https://en.wikipedia.org/wiki/C%2B%2B'><img title='C++' src='img/icons/c++.svg'></a>",
  node: "<a href='https://nodejs.org'><img title='Node.js' src='img/icons/node.svg'></a>",
  php: "<a href='http://www.php.net'><img title='PHP' style='top: -3px; position: relative;' src='img/icons/php.svg'></a>"
};

let techIcons = {
  redis: "<a href='http://redis.io'><img title='Redis' style='top: -3px; position: relative;'src='img/icons/redis.svg'></a>",
  mysql: "<a href='http://www.mysql.com'><img title='MySQL' style='top: -3px; position: relative;' src='img/icons/mysql.svg'></a>",
  mongo: "<a href='https://www.mongodb.com'><img title='MongoDB' style='top: -3px; position: relative;' src='img/icons/mongo.svg'></a>",
  socketio: "<a href='http://socket.io'><img title='Socket.IO' style='top: -3px; position: relative;'src='img/icons/socketio.svg'></a>",
  express: "<a href='http://expressjs.com'><img title='Express JS' src='img/icons/express.svg'></a>",
  react: "<a href='https://facebook.github.io/react'><img title='React' src='img/icons/react.svg'></a>",
  angular: "<a href='https://angularjs.org'><img title='Angular JS' src='img/icons/angular.svg'></a>",
  jquery: "<a href='https://jquery.com'><img title='jQuery' src='img/icons/jquery.svg'></a>",
  bootstrap: "<a href='http://getbootstrap.com'><img title='Bootstrap' src='img/icons/bootstrap.svg'></a>",
  randomapi: "<a href='https://beta.randomapi.com'><img title='RandomAPI' src='img/icons/randomapi.png'></a>",
};

let miscIcons = {
  skeleton: "<a href='http://getskeleton.com'>Skeleton</a>",
  ejs: "<a href='http://www.embeddedjs.com'>EJS</a>",
  aircrack: "<a href='https://www.aircrack-ng.org'>Aircrack-ng Suite</a>",
  pyrit: "<a href='https://pyrit.wordpress.com/about'>Pyrit</a>",
  twitter: "<a href='https://dev.twitter.com/docs'>Twitter API</a>",
  yahoo: "<a href='https://developer.yahoo.com/weather'>Yahoo Weather API</a>",
  jade: "<a href='https://pugjs.org'>Jade/Pug</a>"
}

$.get("files/projects.json", data => {
  let projectName = window.location.pathname.slice(9);
  let project = _.find(data, project => project.seo === projectName);

  let pictures = [], lang = [], tech = [], misc = [];

  $("#title").html(project.name);
  $("#description").html(project.description);
  $("#dates").html(`${project.startDate} - ${project.endDate}`);

  if (project.github) {
    $("#github").attr('href', project.github);
  } else {
    $("#github").addClass('inactive')
  }

  if (project.livesite) {
    $("#live").attr('href', project.livesite);
  } else {
    $("#live").addClass('inactive')
  }

  project.pictures.forEach(picture => {
    pictures.push(`<img class='pics' id='abc' src="img/projects/${picture}">`);
  });

  $("#pictures").html(pictures.join(''));
  $('#pictures img').on('click', image => {
    $('#modal').css('opacity', 1);
    $('#modal').css('visibility', 'visible');

    $('#modalPic').attr('src', image.target.src);
    $('#modal a').attr('href', image.target.src);

    $('#modal').click(() => {
      hideModal();
    });

    $('#modal a').click(e => {
      e.stopPropagation();
    });

    $(document).keyup(function(e) {
       if (e.keyCode == 27) {
         hideModal();
       }
    });

    function hideModal() {
      $('#modal').css('opacity', 0);
      setTimeout(() => {
        $('#modal').css('visibility', 'hidden');
      }, 250);
    }

  });

  project.tech.forEach(item => {
    tech.push(techIcons[item] + "&nbsp;&nbsp;&nbsp;");
  });

  $("#tech").html(tech.join(''));

  project.lang.forEach(item => {
    lang.push(langIcons[item] + "&nbsp;&nbsp;&nbsp;");
  });

  $("#langs").html(lang.join(''));

  project.misc.forEach(item => {
    if (!(item in miscIcons)) {
      misc.push(item + "&nbsp;&nbsp;&nbsp;");
    } else {
      misc.push(miscIcons[item] + "&nbsp;&nbsp;&nbsp;");
    }
  });

  $("#misc").html(misc.join(''));
});
