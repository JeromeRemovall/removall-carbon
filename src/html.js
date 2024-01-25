import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
	  	<link id="favicon" rel="icon" href="https://www.portailadminremovall2021.removall-carbon.com/wp-content/uploads/2022/03/favicon.png" type="image/x-icon"/>
	  	<script
			dangerouslySetInnerHTML={{
				__html: `
						// window.axeptioSettings = {
						// 	clientId: "62364fe462f500a3bda378a7",
						// };
						
						// (function(d, s) {
						// 	var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
						// 	e.async = true; e.src = "//static.axept.io/sdk-slim.js";
						// 	t.parentNode.insertBefore(e, t);
						// })(document, "script");

						function launchGA_Analytics() {
							(function(d, s) {
								var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
								e.async = true; e.src = "https://www.googletagmanager.com/gtag/js?id=G-FTJ26XV0B7&l=dataLayerAnalytics";
								t.parentNode.insertBefore(e, t);
							})(document, "script");
							
							(function(){
								window.dataLayerAnalytics = window.dataLayerAnalytics || [];
								function gtag(){
									dataLayerAnalytics.push(arguments);
								}
								gtag('js', new Date());
								gtag('config', 'G-FTJ26XV0B7');
							})(document, "script");
						}

						function launchGA_Ads() {
							(function(d, s) {
								var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
								e.async = true; e.src = "https://www.googletagmanager.com/gtag/js?id=G-T3J1VPFELX&l=dataLayerAds";
								t.parentNode.insertBefore(e, t);
							})(document, "script");
							
							(function(){
								window.dataLayerAds = window.dataLayerAds || [];
								function gtag(){
									dataLayerAds.push(arguments);
								}
								gtag('js', new Date());
								gtag('config', 'G-T3J1VPFELX');
							})(document, "script");
						}

						window.addEventListener("load", ()=> {
							launchGA_Analytics();
							launchGA_Ads();
						});

						// void 0 === window._axcb && (window._axcb = []);

						// window._axcb.push(function(axeptio) {
						// 	axeptio.on("cookies:complete", function(choices) {
						// 		if(choices.google_analytics){
						// 			launchGA();
						// 		}
						// 	})

						// 	const observer = new MutationObserver(function(mutations_list) {
						// 		mutations_list.forEach(function(mutation) {
						// 			mutation.addedNodes.forEach(function(added_node) {
						// 				if(added_node.className === "WebsiteOverlay__WidgetContainer-sc-1tlh7za-2 lmCzqk ax-widget-container"){
						// 					let button = document.querySelector("button#axeptio_btn_dismiss");
						// 					button.addEventListener("click", ()=> {
						// 						window.location.reload();
						// 					})
						// 				}
						// 			});
						// 		});
						// 	});
							
						// 	observer.observe(document.querySelector(".WebsiteOverlay__WebsiteOverlayStyle-sc-1tlh7za-0.bqzerq.ax-website-overlay"), { subtree: true, childList: true });
						// });	
					`,
			}}
		/>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
