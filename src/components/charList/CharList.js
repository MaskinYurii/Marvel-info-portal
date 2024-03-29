import { Component } from 'react';

import MarvelService from './../../services/MarvelService';
import ErrorMessage from './../errorMessage/ErrorMessage';
import Spinner from './../spinner/Spinner';

import './charList.scss';
class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.allCharactersLoaded)
            .catch(this.onError)
    }


    allCharactersLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    renderItems = (arr) => {
        const items = arr.map(char => {
            let imgStyle = {'objectFit': 'cover'};
            if(char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {'objectFit': 'contain'};
            }

            return (
                <li 
                    className='char__item'
                    key={char.id}
                    onClick={() => this.props.onCharSelected(char.id)}>
                    <img src={char.thumbnail} alt={char.name} style={imgStyle}/>
                    <div className='char__name'>{char.name}</div>
                </li>
            )
        })
        
        return(
            <ul className='char__grid'>
                {items}
            </ul>
        )
    }

    render() {
        const {charList, loading, error} = this.state;
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;