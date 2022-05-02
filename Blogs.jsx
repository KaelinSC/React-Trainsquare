import React, { useState, useEffect } from 'react';
import debug from 'sabio-debug';
import { Card, Col } from 'react-bootstrap';
import Pagination from 'rc-pagination';
import * as blogsService from '../../services/blogsService';
import BlogsCard from './BlogsCard';
import locale from 'rc-pagination/lib/locale/en_US';
import 'rc-pagination/assets/index.css';

const _logger = debug.extend('Blogs');

function Blog() {
    const [blogsList, setBlogsList] = useState({
        blogs: [],
        arrayOfBlogs: [],
        pageIndex: 0,
        pageSize: 12,
        query: '',
        totalCount: '',
        totalPages: '',
    });

    const [currentPage, setCurrentPage] = useState({
        current: 1,
        index: 0,
        size: 8,
        query: '',
        items: [],
    });
    _logger(blogsList);
    _logger(locale);

    useEffect(() => {
        blogsService
            .paginate(blogsList.pageIndex, blogsList.pageSize, blogsList.query)
            .then(onGetBlogSuccess)
            .catch(onGetBlogError);
    }, []);

    const onGetBlogSuccess = (response) => {
        _logger(response);
        let current = response.item.current + 1;
        let pageIndex = response.item.pageIndex;
        let pageSize = response.item.pageSize;
        let totalPages = response.item.totalPages;
        let listOfBlogs = response.item.pagedItems;
        let query = response.item.query;

        setBlogsList((prev) => {
            const newAr = { ...prev };
            newAr.blogs = listOfBlogs;
            newAr.current = current;
            newAr.pageIndex = pageIndex;
            newAr.pageSize = pageSize;
            newAr.query = query;
            newAr.totalPages = totalPages;
            newAr.arrayOfBlogs = listOfBlogs.map(mapBlogs);
            return newAr;
        });
    };
    // const onChangePage = (page) => {
    //     _logger('page', page);

    //     if (blogsList.query) {
    //         setBlogsList((prev) => {
    //             let arTempData = { ...prev };
    //             return arTempData;
    //         });
    //         blogsService
    //             .paginate(page - 1, blogsList.pageSize, blogsList.query)
    //             .then(onGetBlogSuccess)
    //             .catch(onGetBlogError);
    //     } else {
    //         setBlogsList((prev) => {
    //             return { ...prev, pageIndex: page - 1, current: page };
    //         });
    //         blogsService
    //             .id(page - 1, blogsList.pageSize)
    //             .then(onGetBlogSuccess)
    //             .catch(onGetBlogError);
    //     }
    // };

    const onGetBlogError = (err) => {
        _logger(err);
    };

    const mapBlogs = (blogs) => {
        _logger(blogs);
        return <BlogsCard key={blogs.id} blogs={blogs} />;
    };

    const renderCards = () => {
        return blogsList.arrayOfBlogs;
    };

    return (
        <React.Fragment>
            <Card>
                <Pagination>
                    <Pagination.Prev onClick={onPrevClick} />
                    {currentPage.items}
                    <Pagination.Next onClick={onNextClick} />
                </Pagination>
                <div className="container">
                    <div className="row">
                        <div className="page-title-box">
                            <h1 style={{ textAlign: 'center' }}>Blog Header</h1>
                        </div>

                        <div className="row">{renderCards()}</div>
                    </div>

                    <Col md="6" className="d-flex align-items-center justify-content-left">
                        <div>
                            <h5 className="font-size-sm text-uppercase font-weight-bold text-dark mb-3 text-center mt-4">
                                See More
                            </h5>
                        </div>
                    </Col>
                </div>
            </Card>
        </React.Fragment>
    );
}

export default Blog;
