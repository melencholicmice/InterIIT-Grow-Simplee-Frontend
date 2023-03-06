import React from 'react'
import PackageTable from './PackageTable';
import SearchBar from './SearchBar';

const MainPackageTable = () => {
    return (
        <>
            <SearchBar />
            <PackageTable />
        </>
    )
}

export default MainPackageTable;