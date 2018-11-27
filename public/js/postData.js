
(() => {

	const heading = document.querySelector(".heading-h1");
	const subHeading = document.querySelector(".subheading");	
	const meta = document.querySelector(".meta");
	const article = document.querySelector(".article");

	function showPost(post) {
	    heading.innerHTML = post.header;
		subHeading.innerHTML = post.subheader;
		meta.innerHTML = post.meta;
	
		
	}

    fetch("/post-data").then( data => data.json())
        .then(data => {
			showPost(data[0]) 
        })

})()





