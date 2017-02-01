import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { loadThumbnails, thumbnailLoaded } from '../actions';
import ThumbnailGrid from '../components/ThumbnailGrid';
import Pagination from '../components/Pagination';
import { thumbnailViewer } from '../styles/thumbnailViewer.scss';
import { ThreeBounce } from 'better-react-spinkit';

class ThumbnailViewer extends Component {
    constructor(props) {
        super(props);
        this.thumbnailLoaded = this.thumbnailLoaded.bind(this);
    }
    componentDidMount() {
        this.props.loadThumbnails(this.props.page);
    }
    componentDidUpdate(prevProps) {
        if (this.props.page !== prevProps.page) {
            // watch route changes for pagination changes
            this.props.loadThumbnails(this.props.page);
        }
    }
    thumbnailLoaded() {
        if (!this.props.thumbnailsFetching && !this.props.pageCached) {
            this.props.thumbnailLoaded();
        }
    }
    render() {
        const { thumbnails, thumbnailsFetching, page, allLoaded } = this.props;

        const optionalLoading = (
            <h2 style={{ display: (!thumbnailsFetching && allLoaded) ? 'none' : 'block'}}>
              <ThreeBounce fadeIn={false} /><br/>
              loading
            </h2>
        );

        const pagination = (
            <Pagination
                page={page}
                resultCount={thumbnails.length}
                allLoaded={allLoaded} />
        );

        return (
          <div className={thumbnailViewer}>
            You are browsing <b>MOVIE</b> titles<br />
            { pagination }
            { optionalLoading }
            <ThumbnailGrid
                thumbnails={thumbnails}
                allLoaded={allLoaded}
                thumbnailLoaded={this.thumbnailLoaded} />
            { allLoaded && pagination }
          </div>
        );
    }
}

ThumbnailViewer.propTypes = {
    thumbnailsFetching: PropTypes.bool,
    thumbnails: PropTypes.array,
    loadThumbnails: PropTypes.func,
    page: PropTypes.number,
    allLoaded: PropTypes.bool,
    thumbnailLoaded: PropTypes.func,
    pageCached: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        thumbnailsFetching: state.thumbnailsFetching,
        thumbnails: state.thumbnails,
        allLoaded: !!((state.loadCount === state.thumbnails.length || state.pageCached) && state.thumbnails.length),
        pageCached: state.pageCached
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadThumbnails: (page) => dispatch(loadThumbnails(page)),
        thumbnailLoaded: (num) => dispatch(thumbnailLoaded(num))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThumbnailViewer);
