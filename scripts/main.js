var DETAIL_IMAGE_SELECTOR = "[data-image-role = 'target']";
var DETAIL_TITLE_SELECTOR = "[data-image-role = 'title']";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role = 'trigger']";

function setDetails(imageUrl, titleText) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);

  document.getElementById("previous").addEventListener("click", function(event) {
    event.preventDefault();
    prevButton();
  });

  document.getElementById("next").addEventListener("click", function(event) {
    event.preventDefault();
    nextButton();
  });
}

initializeEvents();

// Previous and Next button logic

function getImagesArray() {
  "use strict";
  var imgArray = getThumbnailsArray();
  for (var i = 0; i < imgArray.length; i++) {
    imgArray[i] = imgArray[i].href;
  }
  return imgArray;
}

function prevButton() {
  var imgArray = getImagesArray();
  var thumbArray = getThumbnailsArray();
  var curr = imgArray.indexOf(document.getElementById("detail-image").src);
  if (curr == 0) {
    curr = imgArray.length - 1;
  } else {
    curr = curr - 1;
  }
  thumbArray[curr].click();
}

function nextButton() {
  var imgArray = getImagesArray();
  var thumbArray = getThumbnailsArray();
  var curr = imgArray.indexOf(document.getElementById("detail-image").src);
  if (curr == 6) {
    curr = 0;
  } else {
    curr = curr + 1;
  }
  thumbArray[curr].click();
}
