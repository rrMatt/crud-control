import { cloneDeep } from 'lodash'

// holder for data that fake ajax calls modify
const usersDataStore = [
    { id: 1, firstName: 'Joe', lastName: 'Bloggs', email: 'joe.bloggs@test.com', gender: 'male' },
    { id: 2, firstName: 'Matt', lastName: 'Saunders', email: 'matt@river.red', gender: 'male' },
    { id: 3, firstName: 'Maggie', lastName: 'Simpson', email: 'maggie@test.com', gender: 'female' },
    { id: 4, firstName: 'Clark', lastName: 'Kent', email: 'clark@test.com', gender: 'male' },
  ];



export function getUsers(searchTerms = {}){
    return new Promise((resolve, reject) => {

        const terms = {
            pageSize: searchTerms.pageSize || 10,
            pageNumber: searchTerms.pageNum || 1,
            filter: (searchTerms.filter || '').toLocaleLowerCase(),
        };
        const skip = (terms.pageNumber - 1) * terms.pageSize;

        setTimeout(() => {
            let results = cloneDeep(usersDataStore);
            if(terms.filter){
                results = results.filter(x => x.firstName.toLocaleLowerCase().indexOf(terms.filter) > -1 || x.lastName.toLocaleLowerCase().indexOf(terms.filter) > -1);
            }
    
            const output = {
                results : results.slice(skip, skip + terms.pageSize),
                resultCount : results.length
            }
            resolve(output);
        }, 300);        

    });
}


export function createUser(user){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            const cleansedUser = cloneDeep(user);
            cleansedUser.id = new Date().getTime();
            usersDataStore.push(cleansedUser);
            resolve();
        }, 300);
    });
}


export function editUser(user){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const cleansedUser = cloneDeep(user);
            const index = usersDataStore.findIndex(x => x.id == cleansedUser.id);
            if(index > -1){
                usersDataStore.splice(index, 1, cleansedUser);
            }
            resolve();
        }, 300);
    });
}


export function deleteUser(user){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const cleansedUser = cloneDeep(user);
            const index = usersDataStore.findIndex(x => x.id == cleansedUser.id);
            if(index > -1){
                usersDataStore.splice(index, 1);
            }
            resolve();
        }, 300);
    });
}