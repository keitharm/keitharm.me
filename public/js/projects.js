let projects = [];
$.get('files/projects.json', data => {
  data.forEach((project, index) => {
    projects.push(
`<div class="projectTile">
<a href="project/${project.seo}">
<img src="img/projects/${project.image}">
</a>
<span>${project.name}</span>
</div>`
);
  });
  $("#projectContent").html($("#projectContent").html() + projects.join(''));
});
