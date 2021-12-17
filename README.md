# xavier-portfolio
A portfolio for artist Xavier Sylvia-Jackson

## Design Decisions
### Why React?
I chose to build the website with React, as opposed to vanilla HTML, because it allows for
dynamic creation and rendering of components. Since I knew I would be repeatedly rendering multiple
elements of the same layout such as image displays, I knew React would be a perfect fit for this
website. Additionally, most of websites content is stored in Firebase. React allowed me to easily
and dynamically render this content as I grabbed it from the cloud.

### Why Firebase?
I used Firebase for this project because I wanted Xavier to be able to edit the content on the site
on his own. Firebase allowed me build an admin dashboard for him by storing images in the cloud
with Firebase Storage and store the corresponding image data (such as titles and descriptions) with
Cloud Firestore. I also utilized Firebase's authentication system to only allow for him to edit
the websites data.