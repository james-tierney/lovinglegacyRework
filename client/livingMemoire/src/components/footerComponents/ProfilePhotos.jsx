import React from 'react';
import './footerStyles/mediaGrid.css';

const ProfilePhotos = () => {

    const posts = [
        { id: 1, imageUrl: 'https://via.placeholder.com/800?text=Post+1' },
        { id: 2, imageUrl: 'https://via.placeholder.com/800?text=Post+2' },
        { id: 3, imageUrl: 'https://via.placeholder.com/800?text=Post+3' },
        { id: 4, imageUrl: 'https://via.placeholder.com/800?text=Post+4' },
        { id: 5, imageUrl: 'https://via.placeholder.com/800?text=Post+5' },
        { id: 6, imageUrl: 'https://via.placeholder.com/800?text=Post+6' },
        { id: 7, imageUrl: 'https://via.placeholder.com/800?text=Post+7' },
        { id: 8, imageUrl: 'https://via.placeholder.com/800?text=Post+8' },
        { id: 9, imageUrl: 'https://via.placeholder.com/800?text=Post+9' },
    ]

    return (
      <div className="profile-posts">
        {posts.map(post => (
          <div key={post.id} className="post">
            <img src={post.imageUrl} alt={`Post ${post.id}`} />
          </div>
        ))}
      </div>
        /* same as videos just need to make an endpoint that gets 
            all the media and filters the different media types 
            need to sort the image to be a link to the firebase storage
            for the media images
        */
    )
}


export default ProfilePhotos;