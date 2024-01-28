/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import cl from './Breadcrumbs.module.css';

export default function Breadcrumbs(props) {
    const { category, title } = props;

    return (
        <div className={cl['breadcrumbs']}>
            <Link className={cl['breadcrumbs-item']} to='/catalog'> Каталог </Link>
            {category && (
                <Link className={cl["breadcrumbs-item"]} to={`/catalog/${category}`}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
            )}
            <p className={cl["breadcrumbs-last"]}>
                {title.charAt(0).toUpperCase() + title.slice(1)}
            </p>
        </div>
    );
}
