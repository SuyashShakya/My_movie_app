import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { Box } from '@material-ui/core';

const PaginationComponent = ({pageCount, setCurrentPage}) => {
    const onPageChange = (page) => {
        setCurrentPage(page);
        window.scroll(0, 0)
    };
    return (
        <Box display='flex' justifyContent='center' m={5}>
            <Pagination
                count={pageCount}
                onChange ={(e) => onPageChange(e.target.textContent)}
                variant='outlined'
                shape='rounded'
                color='secondary'
                hideNextButton
                hidePrevButton
            />
        </Box>
    )
}

export default PaginationComponent;