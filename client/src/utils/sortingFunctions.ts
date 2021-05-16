export const sortByField = <T extends unknown>(fieldToSort: keyof T) => ( a: T, b: T ) => {
    if ( a[fieldToSort] > b[fieldToSort] ){
      return -1;
    }
    if ( a[fieldToSort] < b[fieldToSort] ){
      return 1;
    }
    return 0;
  }
