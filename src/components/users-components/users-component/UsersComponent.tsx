"use client";

import {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {getAllUsers} from "@/service/api.service";
import {IUser} from "@/models/IUser";
import "./UsersComponent.css"
import {SearchComponent} from "@/components/search-component/SearchComponent";
import {UserListComponent} from "@/components/users-components/user-list-component/UserListComponent";
import {PaginationComponent} from "@/components/pagination-component/PaginationComponent";

const UsersComponent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [users, setUsers] = useState<IUser[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const page = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("q") || "";


    useEffect(() => {
        fetchUsers(page, query).catch((error) =>
            console.error("Помилка отримання юзерів:", error)
        );
    }, [page, query]);

    const fetchUsers = async (page: number, query: string) => {
        setLoading(true);
        try {
            const {users, total} = await getAllUsers(page, query);
            setUsers(users);
            setTotal(total);
        } catch (error) {
            console.error("Помилка отримання юзерів:", error);
        } finally {
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(total / 30);

    const updateParams = (params: Record<string, string>) => {
        const newParams = new URLSearchParams(searchParams.toString());
        Object.entries(params).forEach(([key, value]) => {
            if (value) newParams.set(key, value);
            else newParams.delete(key);
        });

        router.push(`/users?${newParams.toString()}`);
    };

    const handlePageUser = (newPage: number) => {
        updateParams({page: newPage.toString()});
    };

    const handleSearchUser = (query: string) => {
        updateParams({page: "1", q: query});
    };

    return (
        <div className="users-list">
            <h1>User list</h1>
            <div className="search-component">
                <SearchComponent searchType="users" onSearch={handleSearchUser} search={query}/>
            </div>
            <ul>
                {loading ? (
                    <p>Loading...</p>
                ) : users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id}>
                            <UserListComponent user={user}/>
                        </li>
                    ))
                ) : (
                    <p>No users</p>
                )}
            </ul>
            {total > 0 && (
                <PaginationComponent totalPages={totalPages} currentPage={page} onPageChange={handlePageUser}/>
            )}
        </div>
    );
}

export default UsersComponent;