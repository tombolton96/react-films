import React, { Component } from 'react';
import './filmDetails.css';

class FilmDetails extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            slug: props.match.params.slug,
            error: null,
            dataLoaded: false,
            title: '',
            longDescription: '',
            rating: null,
            cloudinaryId: null
        };
    }

    componentDidMount() {
        const { slug } = this.state;

        fetch(`https://api.flixpremiere.com/v1/films/slug/${slug}`)
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(result => {
                this.setState({
                    dataLoaded: true,
                    title: result.title,
                    longDescription: result.long_description,
                    rating: result.rating,
                    cloudinaryId: result.cover_art[0].cloudinary_id
                });
            })
            .catch(error => {
                this.setState({
                    error
                });
                console.error(error);
            })
    }

    createDescription(text) {
        return {__html: text};
        // dangerouslySetInnerHTML used as the source of the html is trusted
      }

    render() {
        const { slug, title, longDescription, rating, cloudinaryId, error, dataLoaded } = this.state;

        if(error) {
            return <div>Error: {error.message}</div>;
        } else if (!dataLoaded) {
            return <div>Loading...</div>;
        } else {
            return(
                <div className="container">
                    <div className="details">
                        <h3>{title}</h3>
                        <p>Rated {rating}/5</p>
                        <p dangerouslySetInnerHTML={this.createDescription(longDescription)}></p>
                    </div>
                    <div className="poster">
                        <img alt={slug} src={`https://res.cloudinary.com/flixpremiere/image/upload/${cloudinaryId}`}></img>
                    </div>
                </div>
            );
        }
    }
}

export default FilmDetails;