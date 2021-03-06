function FetchAPI(api) {
    fetch(`http://35.75.176.121:3000/${api}`)
        .then(response => {
            console.log(response.status);
            // エラーレスポンスが返されたことを検知する
            if (!response.ok) {
                console.error("エラーレスポンス", response);
            } else {
                return response.json().then(testData => {
                    console.log(testData);
                    connection.close();
                });
            }
        }).catch(error => {
            console.error(error);
        });
}
