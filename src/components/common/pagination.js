import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { Box } from '@material-ui/core';

const PaginationComponent = ({pageCount, onPageChange}) => {
    return (
        <Box display='flex' justifyContent='center' m={5}>
            <Pagination
                count={pageCount}
                onChange ={onPageChange}
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