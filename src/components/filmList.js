import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './filmList.css';

class FilmList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            dataLoaded: false,
            listTitle: '',
            listSlug: '',
            list: []
        };
    }

    componentDidMount() {
        fetch("https://api.flixpremiere.com/v1/films/filter/now_showing?limit=10")
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(result => {
                let list = [];

                result.films.forEach(film => {
                    list.push({
                        id: film.id,
                        slug: film.slug,
                        title: film.title,
                        duration: film.duration_seconds
                    });
                });

                this.setState({
                    dataLoaded: true,
                    listTitle: result.title,
                    listSlug: result.slug,
                    list
                });
            })
            .catch(error => {
                this.setState({
                    error
                });
                console.error(error);
            })
    }

    render() {
        const { error, dataLoaded, listTitle, list } = this.state;
        const { minDuration } = this.props;

        if(error) {
            return <div>Error: {error.message}</div>;
        } else if (!dataLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="list">
                    <h4 className="list_title">{listTitle}</h4>
                    <ul className="items">
                        {list.filter(item => item.duration > minDuration)
                            .map(item => 
                                <li key={item.id}>
                                    <Link to={`/${item.slug}`}>{item.title}</Link> ({item.duration}s)
                                </li>
                            )
                        }
                    </ul>
                </div>
            );
        }
    }
}

export default FilmList;