import React from 'react';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';

function BlogsCard(props) {
    const _logger = debug.extend('BlogsCard');
    _logger(props);

    return (
        <div className="col-md-6 col-lg-3 d-flex align-items-stretch">
            <div className="card border">
                <img
                    className="card-img-top"
                    width={300}
                    height={200}
                    src={props.blogs.imageUrl}
                    alt={props.blogs.id}
                />
                <div className="card-body">
                    <h3 className="card-title">{props.blogs.title}</h3>
                    <p className="card-text">{props.blogs.content}</p>
                </div>

                <div className="card-footer">
                    <small className="text-muted">Published: </small>
                </div>
                <button type="button" className="btn btn-outline-info ms-2">
                    Read More!
                </button>
            </div>
        </div>
    );
}

BlogsCard.propTypes = {
    blogs: PropTypes.shape({
        id: PropTypes.number.isRequired,
        type: PropTypes.number.isRequired,
        author: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        datePublished: PropTypes.number.isRequired,
    }),
};

export default BlogsCard;
