/**
 * The function returns the longest subsequence that's decreasing, aka the time-frame of longest
 * low bitcoin prices.
 * Inspiration and help gotten from https://www.geeksforgeeks.org/longest-decreasing-subsequence/
 *
 * @param arr an array of numbers
 * @returns {number} the length of the longest downward subsequence
 */
function lengthOfLongestDownwardTrend(arr)
{
    const n = arr.length
    const lds = new Array(n);
    let max = 0;
    // initialize the loop to always begin at place one
    for (let i = 0; i < n; i++) {
        lds[i] = 1;
    }

    // From the bottom to the top: get the LDS
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[i] < arr[j] &&
                lds[i] < lds[j] + 1) {
                lds[i] = lds[j] + 1;
            }
        }
    }

    // Find the longest LDS value out of all LDS's.
    for (let i = 0; i < n; i++) {
        if (max < lds[i]) {
            max = lds[i];
        }
    }

    return max;
}