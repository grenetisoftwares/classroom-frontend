import React, {useMemo, useState} from 'react'
import {ListView} from "@/components/refine-ui/views/list-view.tsx";
import {Breadcrumb} from "@/components/refine-ui/layout/breadcrumb.tsx";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {DEPARTMENT_OPTIONS} from "@/constants";
import {CreateButton} from "@/components/refine-ui/buttons/create.tsx";
import {DataTable} from "@/components/refine-ui/data-table/data-table.tsx";
import {useTable} from "@refinedev/react-table";
import {Subject} from "@/types";
import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge.tsx";


const SubjectList = () => {
    const [ searchQuery, setSearchQuery ] = useState("")
    const [selectDepartment, setSelectDepartment ] = useState('all')

    // Table
    const departmentFilters = selectDepartment === 'all' ? [] : [
        {field: 'department', operator: 'eq' as const, value: selectDepartment}
    ]

    const searchFilters = searchQuery ?
        [{field: 'name', operator: 'contains' as const, value: searchQuery}] : [];

    const subjectTable = useTable<Subject>({
        columns: useMemo<ColumnDef<Subject>[]>(() => [  //we use useMemo to avoid recreating each column on every render
            {
                id: "code",
                accessorKey: "code",
                size: 100,
                header: () => <p className={'column-title ml-2'}>Code</p>,
                cell: ({getValue}) => <Badge>{getValue<string>()}</Badge>
            },
            {
                id: "name",
                accessorKey: "name",
                size: 200,
                header: () => <p className={'column-title'}>Name</p>,
                cell: ({getValue}) => <span className={'text-foreground'}>
                    {getValue<string>()}
                </span>,
                filterFn: 'includesString'
            },
            {
                id: "department",
                accessorKey: "department",
                size: 150,
                header: () => <p className={'column-title ml-2'}>Department</p>,
                cell: ({getValue}) => <Badge variant={'secondary'}>{getValue<string>()}</Badge>
            },
            {
                id: "description",
                accessorKey: "description",
                size: 300,
                header: () => <p className={'column-title ml-2'}>Description</p>,
                cell: ({getValue}) => <span className={'truncate line-clamp-2'}>{getValue<string>()}</span>
            },
        ], []),
        refineCoreProps: {
            resource: "subjects",
            pagination: {pageSize: 10, mode:"server"},
            filters: {
                permanent: [...departmentFilters, ...searchFilters]
            },
            sorters: {
                initial: [
                    {field: 'id', order: 'desc' },
                ]
            }
        }
    })
    return (
        <ListView>
            <Breadcrumb />

            <h1 className={'page-title'}>Subjects</h1>

            {/*<div className={'intro-row'}>*/}
            {/*    <p>Quick access to essential metrics and management tools</p>*/}
            {/*    <div className="actions-row">*/}
            {/*        <div className="search-field">*/}
            {/*            <Search  className={'search-icon'}/>*/}
            {/*            <Input*/}
            {/*                type={'text'}*/}
            {/*                placeholder={'Search by name...'}*/}
            {/*                className={'pl-10 w-full'}*/}
            {/*                value={searchQuery}*/}
            {/*                onChange={(e) => setSearchQuery(e.target.value)}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div>
                <p>Quick access to essential metrics and management tools</p>
                <div className={'flex flex-col gap-3 sm:flex-row justify-start mt-4'}>

                    {/*// Input component with icon*/}
                    <div className={'relative w-full flex max-h-9 md:max-w-72'}>
                        <Search
                            className={'h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-primary'}
                        />
                        <Input
                            type={'text'}
                            placeholder={'Search by name...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={'pl-10 w-full'}
                        />
                    </div>


                    <div>
                        <Select
                            value={selectDepartment}
                            onValueChange={setSelectDepartment}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={'Filter by department...'}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={'all'}>
                                    All Departments
                                </SelectItem>
                                {DEPARTMENT_OPTIONS.map((department) => (
                                   <SelectItem value={department.value} key={department.value}>
                                       {department.label}
                                   </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <CreateButton />
                </div>
            </div>
            <DataTable table={subjectTable} />
        </ListView>
    )
}
export default SubjectList
