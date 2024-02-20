function nextPermutation(arr) {
    // Find the largest index k such that arr[k] < arr[k+1]
    let k = arr.length - 2;
    while (k >= 0 && arr[k] >= arr[k + 1]) {
        k--;
    }

    // If no such index exists, this is the last permutation
    if (k === -1) {
        return false;
    }

    // Find the largest index l greater than k such that arr[k] < arr[l]
    let l = arr.length - 1;
    while (arr[l] <= arr[k]) {
        l--;
    }

    // Swap arr[k] and arr[l]
    [arr[k], arr[l]] = [arr[l], arr[k]];

    // Reverse the subarray from k+1 to the end
    let i = k + 1;
    let j = arr.length - 1;
    while (i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
    }

    return true;
}

// [min, max)
function get_random(min, max){
    randomFloat = Math.random();
    return Math.floor(randomFloat * (max - min)) + min;

}

function simulation(probs, genders, arr){
    score = 0;
    var base = [-1,-1,-1]; // 각각 1,2,3루, 주자가 있다면 해당 주자의 인덱스
    for(var inning = 0; inning < 3; inning++){
        for(var i = 0; i < 10; i++){
            p = get_random(0, 100);
            hits = 0;
            if(p <= probs[arr[i]][0]) // 아웃
                hits = 0;            
            else if(p <= probs[arr[i]][0] + probs[arr[i]][1]) // 1루타
                hits = 1;
            else if(p <= probs[arr[i]][0] + probs[arr[i]][1] + probs[arr[i]][2]) // 2루타
                hits = 2;
            else if(p <= probs[arr[i]][0] + probs[arr[i]][1] + probs[arr[i]][2] + probs[arr[i]][3]) // 3루타
                hits = 3;
            else // 홈런
                hits = 4;

            if(hits == 0){
                p = get_random(0, 100);
                if(p <= 30){ // 나쁜 땅볼
                    if(base[0] >= 0 && base[1] >= 0 && base[2] >= 0){ // 만루

                    }
                    else if(base[1] >= 0 && base[2] >= 0){ // 2-3루

                    }
                    else if(base[0] >= 0 && base[2] >= 0){ // 1-3루
                        base[0] = arr[i];
                    }
                    else if(base[0] >= 0 && base[1] >= 0){ // 1-2루
                        p1 = get_random(0,100);
                        if(p1 <= 50){
                            base[2] = base[1];
                            base[1] = -1;
                            base[0] = arr[i];
                        }
                        else{
                            base[1] = base[0];
                            base[0] = arr[i];
                        }
                    }
                    else if(base[0] >= 0){ // 1루
                        base[0] = arr[i];
                    }
                    else if(base[1] >= 0){ // 2루

                    }
                    else if(base[2] >= 0){ // 3루

                    }
                    else{ // 주자 x

                    }
                }
                else if(p <= 30 + 25){ // 좋은 땅볼
                    if(base[0] >= 0 && base[1] >= 0 && base[2] >= 0){ // 만루
                        score += 1;
                        base[2] = base[1];
                        base[1] = base[0];
                        base[0] = -1;
                    }
                    else if(base[1] >= 0 && base[2] >= 0){ // 2-3루
                        score += 1;
                        base[2] = base[1];
                        base[1] = -1;
                    }
                    else if(base[0] >= 0 && base[2] >= 0){ // 1-3루
                        score += 1;
                        base[2] = -1;
                        base[1] = base[0];
                        base[0] = -1;

                    }
                    else if(base[0] >= 0 && base[1] >= 0){ // 1-2루
                        base[2] = base[1];
                        base[1] = base[0];
                        base[0] = -1;

                    }
                    else if(base[0] >= 0){ // 1루
                        base[1] = base[0];
                        base[0] = -1;

                    }
                    else if(base[1] >= 0){ // 2루
                        base[2] = base[1];
                        base[1] = -1;

                    }
                    else if(base[2] >= 0){ // 3루
                        score += 1;
                        base[2] = -1;
                    }
                    else{ // 주자 x

                    }
                }
                else if(p <= 30 + 25 + 35){ // 나쁜 뜬공

                }
                else{ // 좋은 뜬공
                    if(base[2] >= 0)
                        score += 1;
                    base[2] = base[1];
                    base[1] = base[0];
                    base[0] = -1;
                }

            }
            else{ // 안타를 침
                is_additional_checked = false;
                for(var j = 2; j >= 0; j--){
                    if(base[j] == -1)
                        continue;

                    additional = 0; // 추가 진루
                    
                    if(!is_additional_checked){
                        p1 = get_random(100);
                        if(genders[base[j]] === "male"){
                            if(p1 <= 30)
                                additional = 0;
                            else if(p1 <= 30 + 55)
                                additional = 1;
                            else
                                additional = 2;
                        }
                        else if(genders[base[j]] === "female"){
                            if(p1 <= 60)
                                additional = 0;
                            else if(p1 <= 60 + 35)
                                additional = 1;
                            else
                                additional = 2;                            
                        }
                        is_additional_checked = true;
                    }

                    next_base = j + hits + additional;
                    // (j+1)루에 주자가 있음
                    if(next_base >= 3){
                        score += 1;
                        base[j] = -1;
                    }
                    else{
                        base[next_base] = base[j];
                        base[j] = -1;
                    }
                }
                if(hits == 4)
                    score += 1;
                else
                    base[hits-1] = arr[i];

            }
        }
    }
    return score;
}

function performCalculation() {
    // 빈 2차원 배열 선언 및 초기화
    var probs = new Array(10);
    for (var i = 0; i < 10; i++) {
        probs[i] = new Array(5);
    }

    var genders = new Array(10);

    document.getElementById("status").textContent = "";

    for(var i = 1; i <= 10; i++){
        for(var j = 0; j < 5; j++){
            probs[i-1][j] = parseInt(document.getElementById("prob" + (j+1) + "_" + i).value);
        }
        genders[i-1] = document.getElementById("gender" + i).value;
    }

    for(var i = 0; i < 10; i++){
        if(probs[i][0] + probs[i][1] + probs[i][2] + probs[i][3] + probs[i][4] != 100){
            document.getElementById("status").textContent = (i+1) + "번 타자의 확률 총합이 100%가 아닙니다.";
            return
        }
    }


    arr = [0,1,2,3,4,5,6,7,8,9];

    var top10 = new Array(10);
    for(var i = 0; i < 10; i++){
        top10[i] = [-1, arr.slice()]
    }

    var bottom10 = new Array(10);
    for(var i = 0; i < 10; i++){
        bottom10[i] = [10000000, arr.slice()]
    }

    ctr = 0
    do{
        ctr += 1
        if(ctr % 36288 == 0){
             document.getElementById("status").textContent = (ctr / 36288) + "% 완료..";
        }
        is_check = true;
        for(var i = 0; i < 10; i++){
            for(var j = i+1; j < 10; j++){
                if(arr[i] > arr[j]){
                    if(probs[arr[i]][0] == probs[arr[j]][0] && 
                        probs[arr[i]][1] == probs[arr[j]][1] && 
                        probs[arr[i]][2] == probs[arr[j]][2] && 
                        probs[arr[i]][3] == probs[arr[j]][3] && 
                        probs[arr[i]][4] == probs[arr[j]][4] && 
                        genders[arr[i]] == genders[arr[j]]) { // 동일한 속성을 가진 타자가 여러명 있을 경우 이들간의 자리 바꿈은 제외하기 위한 처리

                        is_check = false;
                        break;
                    }

                }
            }
        }
        if(!is_check)
            continue;

        // console.log(arr)

        T = 100; // 반복 횟수
        avg_score = 0;
        for(var i = 0; i < T; i++)
            avg_score += simulation(probs, genders, arr);
        avg_score /= T;

        new_elem = [avg_score, arr.slice()]
        for(var i = 0; i < 10; i++){
            if(new_elem > top10[i]){
                for(var j = 9; j > i; j--){
                    top10[j] = top10[j-1];
                }
                top10[i] = new_elem;
                break;
            }
        }

        for(var i = 0; i < 10; i++){
            if(new_elem < bottom10[i]){
                for(var j = 9; j > i; j--){
                    bottom10[j] = bottom10[j-1];
                }
                bottom10[i] = new_elem;
                break;
            }
        }


    }while(nextPermutation(arr));

    result = "";
    for(var i = 0; i < 10; i++){
        if(top10[i][0] == -1)
            break;

        for(var j = 0; j < 10; j++)
            top10[i][1][j] += 1;

        result += "상위 " + i + "위 : 타순 (" + top10[i][1] + "), 평균 득점 " + top10[i][0] + "점<br>";
    }
    
    for(var i = 0; i < 10; i++){
        if(bottom10[i][0] == 10000000)
            break;

        for(var j = 0; j < 10; j++)
            bottom10[i][1][j] += 1;

        result += "하위 "  + i + 위 : 타순 (" + bottom10[i][1] + "), 평균 득점 " + bottom10[i][0] + "점<br>";
    }


    document.getElementById("status").innerHTML = result;
}
