var cubeFace = 0;
var cubeCell = 4;
var dictionary = { W:0, O:1, B:2, G:3, R:4, Y:5}
var cellColor = state.state.charAt(cubeCell);
var cellTone = dictionary[cellColor];

// Create an AudioContext
let audioContext = null
let source1 = null
let audioElement = null
let bellSoundSrc = 'https://00e9e64bac34e49da8bc69abe55df18cc218e922553646675b-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fwhite.mp3?qk=AD5uMEvMMZx1_As0WItpr7qPqqa1ZyjC6_ufixD7n1TWtNlq8wPhG6_oyVf4UmlZ98U66tzI32K6F8sh_VZtxyGEPCS9K3UCSWlJeFrseWgXX54aNzcswr2fKN6c4I7JcVvt8d-k8e4pSt3YwAdn8mMyz78PpEOe_AI0vaK5c5nqPaodaGl-gsLxVSVVoI1fcIN0CL2nTrqGprfdfv-NoyZt2JPdtNSX6Xht-u3iMJjIN3NOjonSbLy5DplKmoLRy4WDH0puvewLt3vzA-tADemmwkJTs6Q57eM9QRWuGmVexFJjpXiqMPY-BZzA0BCOtPeCNuWdEGvDLfEwYt0wxuWL7XpaSDVt3z7gNZodeQq4dyqGbMT8cHnFvDBezwZhYEZWO9mK0_eW8OHxlCLtNx03Lk96kvRjRC8bVVjZjJQiiOmaMLZPSnAgs3OPrcbZW-zvpodhY1q6S5ibti2dw2bZnYuK7BqbAP3uck_hlPLPgCT7G5Mip9aTPyGDf5orSeqHcrWidA2IRC-rLKEQlLWBPZLwLJ_YUgo5hfj824g5zEedDMcudj59lQaFAkASWDjsxgVCBtQdUGg1_PgVe_TB5h6M30JpC2dq6whKZTZiLfv8xM6-lYo5bnAUz4uraSoLkdqEIRRDxcsHgadYU4ysTC6m7wnSC396FUwlDrsF00ZrnHK_SbkwQTnAp3_8peqadViEJzt1Of265XHB7C1cpxe5OlNRXjtxTWrCUZniJs-llrymuYf00KvPvATcmnoAY6PzF55X_KMkyt5cQijU2V0pjIp4YA';
let rotateSoundSrc = 'https://00e9e64bac419efe6dd501f4a5cd13681f58cc01586c092241-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fswish.wav?qk=AD5uMEtmZIqOfPweKQ_vMQwXfOe_rDueE9yfRMrMKMgpN3nDLLD9wxqqI3hi5e-pr48ynNe4onnDUbwbK1mMB8M4nnQU4oYXb6QTBYvWIE5PZsbtpKWHRwzAyLV39K7g__VudDx7F7tUnhDhIlvt_u34PHo-8Ipqt6AhDf7Uxi8ho3YGqW67mPe4JfKVXyUgzmgVrSKJ1Q_9rf48le2yIBvJvqPOisxyoaKGwYai8e7uRmkqqSp23Mmmo2rQ5tt-RGzz1BJFEWyOySp_EPp1X5dqEbA1Y73cqYK03YnLUi4f4GTRNx3VSHKW3mq4Iut9cZf3U1un-stQi_cH-lY-eKtsJ7pjDpGpWuZS6SIiixNWhKj9Mul3cVKkWsQCfIc-pqFWUkoWzGJJeW7iCED0FDyqisHsuZvy7g76UZUbUVCSTNiahO_GrToBJvr3_RKkoIN2Lzx1xhlY7oytxjmubpzvRaUnmC1pnGMBZC9td79-deCcVpNJWkDrLoHn8VcRpvDBVbUKhYhRrdVK9mEqnE_ZTQ8F5DfPdSKcQt4IZNtsz8qerdKnicNXS3BqOunF_yqKTnbA_zB5KDn89nD2FZsOB0-785nCzF79LYWTlWNhlQbpb0sx5q7JCZYcIlfQAn2xioe0__Qah3aXZ4kjpiHLp34MmnILSYrmd-osyuCB2elj5DPIq8jYjUWcSOsxkxIumwCWuGTbJxsLmuByNYfRORlbPKK9glW_EWA3A5Vrg_1VJ_S3BtKqySejTtlhaSTHjouk_J4TN-izPLK3tZhW_ijUWQZijg';
let blueSoundSrc = 'https://00e9e64bace4460956d5d217262c3c31e867bd9b07c0ee1467-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fblue.mp3?qk=AD5uMEu8Wu-hc2byskmRxYEH9JTXuU5zE9rYVyMEayt6mWudOJyWmVFsP6TmAqwGB19l-MU1eWLbWItJNOJszlE-vb4HliGXK9vQoOLOl4bF047QWzinXi7XNnSMrQU5LantzWNw1pqCrwU0COIZNaK_fpOyQ3WzbNfcSfr1Fb9NVw_8xu4YwPW98rMR0zIVroQ0SbfmYY1qCjZXkjavTtFGZQGU7cA6fJyQlApIc7m2o4MuAeZ6gIbNQe8FlH6cC1jVxRShJ-B0zbFfCfpsBb_2HNNHMcpNGLNE0srwtju0M-PMJWhOZ34Vxmu06kd1KOA2Uvklov-yvhstn82bkQrjhHhu9BdfaLdx63eLOUSXA7Mr71cDr4O96zA9OfVTqwV6ZLOdfSoTvbO1sRuRthebCEvX2mTamIPAOaRtVylSYHXRSh05PZKq_bu_K8n87sk6Wm2HrHZ_sVlLotPCiLBDZIRsRGTMhUkOFOfB8CPf28FRyfoz5LKgIUfCm82UYqsVgfVH3rLDgqPp20oTvfQwH-P5MauEm7BepIeuc8XAAzVIkiIHLjlAtNZogoMw3ooh6Fp9lIwkOG7ObIIVAqPQ9eKXnvq3uiXr8bUtEFSJDEv5iYPwqwjhX3JWqit1Kn04gwvkBXNgAnVySpie8WW8KqOXTgpsmrGSuzmU4FbK8I6bix8eDi_ilQ86NUjuavNjZL3lUaYkA0eETRaWFIY3MRKCzsq028t8RNmIORJ_5aH20e67q2UtmBSLehhWqGaBBxxmpUi0MLM-GjA2PMYTz8rDrFVB_g';
let outBoundSrc = 'https://00e9e64bacf68c28a6f88ed41a61e6820de5b4c57dd0a6fe39-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Foutofbounds.mp3?qk=AD5uMEsTIPUL8AfRx7xNCou8BOEqNJgq_hk0SN3MVFwk5iMM8_pe1r7PU8sl0FTzv3hu5yC58Go5I7zPOCsYnaPeLjV8ezySDAkfl6B-H6Ex0Z9lU2GOHkfP-5appgf1ZLhvlbeylbsdHeYDFu3DG4-ZyGjVBgeFHaT48X6ab7dWDd2mLaNF0sM2qsX5W2_C0KUSD9fDHUDn2nX8mh6ED8dRLjn_8XHjB5TmMvn9pZGVNBkB12cybg9BYztW5Geseo0LPwAS_t1n1JbhmcYksZcFV1ZzjCKYGrRFW-X5dSYzGKIhxfMgn0h0AkC4Ds5bgfTXiGCaPNOvyvuyGpuUFzz2oEvo-LVxO821-gwPQbBPMJVTTJwnyuB7YHQPXX1qQs5AP8qS9M_HkbhFP5kd4I2WOm2T4Dcn2hrvxn0KAck3v62cZZz7Oy8naz25-0HsRG6Ym19DaBF02U0Q70a0PSvrqNQTDgo8-VfiwHBh6ubS_SU8k-qILhbiOEJaF1HxeBVi6qM8C3gahfe6Gomn_zy9oDCpSpjd-rE5-jFYYRJ-maYWOKukeiiRl5N5cewuoieah8eJrL8f6dqpMuO6MD1AQ6Kex0udnyLI1gAwSiyN_DGeZ3XP1LgXkfVTNs8A0gxZal2oSJIBJP1suPE6QbuRdbSYk9kkXKm0lyVVhFUC7neLpzKYzbykUqXS9GH44-JMFtvHG20OkoeZ2Q1qrNh9xBXczs-nUqJEc81OEl1UMQqkwvG3ZCgzw7QfkKe6hlz6Cz3R0TxrJwEbyOCOHU-yv15XR4jP6A';
let didAddListener = false
console.log(state.state)


function myFunction() {
  if (audioContext == null) {
    let audioContext = new AudioContext();
    
    // Create a (first-order Ambisonic) Resonance Audio scene and pass it
    // the AudioContext.
    let resonanceAudioScene = new ResonanceAudio(audioContext);

    // Connect the scene’s binaural output to stereo out.
    resonanceAudioScene.output.connect(audioContext.destination);

    // Define room dimensions.
    // By default, room dimensions are undefined (0m x 0m x 0m).
    let roomDimensions = {
      width: 0,
      height: 0,
      depth: 0,
    };

    // Define materials for each of the room’s six surfaces.
    // Room materials have different acoustic reflectivity.
    let roomMaterials = {
      // Room wall materials
      left: 'marble',
      right: 'marble',
      front: 'marble',
      back: 'marble',
      // Room floor
      down: 'grass',
      // Room ceiling
      up: 'transparent',
    };

    // Add the room definition to the scene.
    resonanceAudioScene.setRoomProperties(roomDimensions, roomMaterials);

    // Create an AudioElement.
    audioElement = document.createElement('audio');
    audioElement2 = document.createElement('audio');



    // Load an audio file into the AudioElement.
    audioElement.crossOrigin = "anonymous";
    audioElement2.crossOrigin = "anonymous";

    // audioElement.src = './bell-C2.mp3';
    audioElement.src = bellSoundSrc;
    audioElement2.src = rotateSoundSrc;

    // Generate a MediaElementSource from the AudioElement.
    let audioElementSource = audioContext.createMediaElementSource(audioElement);
    let audioElementSource2 = audioContext.createMediaElementSource(audioElement2);


    // Add the MediaElementSource to the scene as an audio input source.
    source1 = resonanceAudioScene.createSource();
    source2 = resonanceAudioScene.createSource();
    audioElementSource.connect(source1.input);
    audioElementSource2.connect(source2.input);


    // Set sound source parameters.
    source1.setRolloff('logarithmic');
    source2.setRolloff('logarithmic');
    source1.setGain(0.25);
    source2.setGain(0.25);

    if (!didAddListener) audioElement.play();
  }


  // Make array to contain source coordinates.
  var cellXpos = [-1, 0, 1, -1, 0, 1, -1, 0, 1];
  var cellYpos = [0, 0, 0, 1, 1, 1, 0, 0, 0];
  var cellZpos = [1, 1, 1, 0, 0, 0, -1, -1, -1];


  // Set coordinates for sound sources.
  var currentCell = 4
  source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
  source2.setPosition(0, 1, 0);



  // Make array to contain sound clips of color names.
  var colorClips = [];
  colorClips[0] = 'https://00e9e64bac34e49da8bc69abe55df18cc218e922553646675b-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fwhite.mp3?qk=AD5uMEvMMZx1_As0WItpr7qPqqa1ZyjC6_ufixD7n1TWtNlq8wPhG6_oyVf4UmlZ98U66tzI32K6F8sh_VZtxyGEPCS9K3UCSWlJeFrseWgXX54aNzcswr2fKN6c4I7JcVvt8d-k8e4pSt3YwAdn8mMyz78PpEOe_AI0vaK5c5nqPaodaGl-gsLxVSVVoI1fcIN0CL2nTrqGprfdfv-NoyZt2JPdtNSX6Xht-u3iMJjIN3NOjonSbLy5DplKmoLRy4WDH0puvewLt3vzA-tADemmwkJTs6Q57eM9QRWuGmVexFJjpXiqMPY-BZzA0BCOtPeCNuWdEGvDLfEwYt0wxuWL7XpaSDVt3z7gNZodeQq4dyqGbMT8cHnFvDBezwZhYEZWO9mK0_eW8OHxlCLtNx03Lk96kvRjRC8bVVjZjJQiiOmaMLZPSnAgs3OPrcbZW-zvpodhY1q6S5ibti2dw2bZnYuK7BqbAP3uck_hlPLPgCT7G5Mip9aTPyGDf5orSeqHcrWidA2IRC-rLKEQlLWBPZLwLJ_YUgo5hfj824g5zEedDMcudj59lQaFAkASWDjsxgVCBtQdUGg1_PgVe_TB5h6M30JpC2dq6whKZTZiLfv8xM6-lYo5bnAUz4uraSoLkdqEIRRDxcsHgadYU4ysTC6m7wnSC396FUwlDrsF00ZrnHK_SbkwQTnAp3_8peqadViEJzt1Of265XHB7C1cpxe5OlNRXjtxTWrCUZniJs-llrymuYf00KvPvATcmnoAY6PzF55X_KMkyt5cQijU2V0pjIp4YA';
  colorClips[1] = 'https://00e9e64bac19816d1b0f02102f226abe6c9ce6f8502ae45c82-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Forange.mp3?qk=AD5uMEvo8RBRjRXn3x43SuXbkVywDkAUYY6xpYBnNXc4M2n4qpZjxSp5r7QrUNjPdZ3Pdrz0Wzk05DT1zqwOGwTapWyzRb6-tr-7qyO2THAxzYmCWZnuLOtHcjNrle8R3tpFhtMK3V8zzCbltFSXre7LreKw35lwsjaMi0mjntdCzM580-kfJRS9ZJ9bO3dgyCJ2fcJvxJYbLQUPpyb8SNWGVwtX1mCK7v7f5nCJgXAdUjT0QBP0-rL5EsT09sKvrof4eROkLNuZ8rEarkGu4kaVnGQ0PqdRWJrQPAXuJD_YKirGVc2pdxBiHdfahqqOQKCGw1LLXUnaHmDyUuVb-KK-j6mm7GcAcdzbpTEk6usTEuJTnrMR0FBCbz8JowAf78l4bRnnov7EFq8JFCgIz1Ir7dj9xSsFLVp58svIacRuw1OlbI1qky6AECANsR5lrFfeZRKBMDrqNGgx4Lu9F32W1XwrvZAjv5DngsP0nfG0M_XooP9yLnroXyiDRgjRZBUEhCuB3fS3j13d7jueG3KWD_ojpUhEY_B3VIKAuWExHgYqirXfytbUtmltMu77XBO0alRaGESmW_4qHd8KnzX_WJKj6f2FyGJS8WSPgWC-uAi0WeaM1lgIGoq7DHBHqF4tYchYgqitBYP1tChmqPo5sAmGfCbDwVVWZhhd0HgQwlN26rR88R4iUb7pp0do2JvxGVKOVjXLyx5Lmh_4rpCN2jC31USzLDqTtgiJa86lY9BDmd0HkHfm7pDpDfaRF1LqsSigxOWOYAlQjtnf1USU-mJiIGTz5Q';
  colorClips[2] = 'https://00e9e64bacfcfa4ff99f55b7e40333ef5af62395ce1e96c47a-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fblue.mp3?qk=AD5uMEuZ13I_relfdgKeSbILrE4zhw87NhgUB5viJLgV7NY9YS4heCTB7dliphJADMiYA92_hNtHJc5kVjAIXCJY_-wwJPpvMiYqjvh7nOzChuvKeW2Fk5_F2gmGYCTpPotP9i8gHDglHEN91uaI9mJH0iweGYBBKLJaqZqMqxd6bJcKulDY95FL9IbLPzr3npxe5U49CUBUM2I-7OT9FiM6Pfs-9JGNeZnGbWRs0gj4hiW1_HKw5JsBX3dwA4l9BcJJ7__Qs9mu9S9Kl_dSkxy7zJ2Q16GSM-nSweq4MfmFGi9wMxnqNNVu4cUEuo7Wl39_8MBaUqw6BWt7rdXMbkpZfPrKQm9VJFo7oKFHFvOMMx7aXVjiHE8nF2-fOP73nOg55MAtf3PYmynbhEAeMuPtxh5wvpQZcCsSh5RicpCgDrIwXdTBQ76l1sdc-zQzpqwvANQvXEFhwSvIFWNVdLxiZ3w5gAQdqqTZvnanfh3i_-qSqJ3KmTtnTgEkJFajxRfSbsNHN0M13WFxavvpKgLpE_bb3ugS1YLIJRX4WLBZiKM4039ON8lA7X4-7RYohyezEYOl1Bjo-ve2EXI_-r8uPkuCgQqLyoIqH6poBRzQ7Zp_UimXUjmKJ2HyqkOE6-csPizptb3gQJjtcmMWksJ_KaiVzIfwv3xPJa8OU7abMKQuriY0wtFG0HLxxmGD9KHc5vQoQkv1BzqWzbfgVWZmm4C8ekJrC84rO2-_veRP4GgtJCg2wPfphGPdUvFbKndhUgqooSueKRUuVJuQdc3AmgJEbTlJ3g';
  colorClips[3] = 'https://00e9e64baca5ae5cc14b9598e6629d432d268669eee5af316b-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fgreen.mp3?qk=AD5uMEtBZm_dcrVh3tZ6zNHMOnQpu1mtWxvIml3-JGo4nHw5nKS0tt6pcq8Ho8ztM4NAzaWJHzV82NUpjHVnMPF014QaSRBIiJ3BwehcuNNYchnRoFoGVn6PfqYxdxMiQwkTMwHhuVEg_XEXPFC7L65-oR_KMKtxscVu67gz63Bz2gw4G4LhUfHxBuHiHyE_U8nPwlJTeoZdTmaD24B6Z2uCZIQSPMPs9HVTr8Leh4X_mbPvP-iOwoEbpNB6hxNxDttMrleawjxzZn0RCe2BIhqCc0LT6ASAYkvBKlCs1hYnoFgKYiSz_j8kG9hGkfz6jJNBDRNN1aIU7ZIGbjO26817tPIbbREzgVkMF-bOqaof9Buj9N9ehN-QuMUAYAU5qMFYK4NnRxpa5mYcmwV3SIOOCQvgpnAHwIHfS12deoexgIari1aRugUdNlC3OBfzYc3Y9dK2ESsBXieqcFEGKheTmz5AUGiqRuTXlYBfupIA_cnV2fuGVD7jKYTEF6bqJycTbj60ZnBYzNE3N_T2yDezr1nhRP26On3GVIrmaSVxbU8QXU_WByo2Al32tlI9JHVLn3vldIntVq1AKhoJ6vrEf8m6RonjT2I3-widJC367BeVwT5SRBQD2IS8zs6Ux28-zkHE4eN5xvgZ_VfoYgkqEQrRdorRAuL4UJe-fArz89IJaB7vGBJbH6b6OOndH9ZrOtfQlD15xUzNFAzVQ89j2WkO8rw3842IWq72O29tFFLY6e-UqNNMbh5lm0K3PCDfwY8Gqq-ioH2FFVLk01egJkhISpShdA';
  colorClips[4] = 'https://00e9e64bac580536cbec89b3a9a7fdd619db168fe4a3b411a8-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fred.mp3?qk=AD5uMEvYNX6aPMiMUw4Dy2KESI15pLHBBFkv_PjBr7s19NgSha9D8PFIWdWcM95n1wA4zWSITn7A-fyJyQWHJpZ8eCMofynWLZ4VG1WTQNebuw0fbP_Sto-_FDsxSrpxB-aBBip1jZCKJvYZa-4ArsFlNpymKzMWA3DiHWJW5OIOKAG6NUAWJw4yarQXQbVJdpbv7laB4V4pGuw_PvL8ZBtgif1tJUc-h_IZVFXjqH9ro9wGeWJlX4apWtEF_2YgJhn3xSFhPLbYy7yUpoRwKUmz949_aNncr3gIRjFSrTp_idaEKYUDTzkEUStk0fyyorNAkh8YWDymJKhFRU4G3e6mHgDRustknVleZQYQQPbranCxmryZ7pMmlJrHItUJp8PmPR4EPfLuPpyWeJwP9nHCgwVu28iz6zS53daC6pOR-dWp2cxtSOABpNaNNHcFWs7CQ6tSG22pitA75LpIj6mdtZObdalWZNleg6c65GnHkCc3VyMlnUAaEpJyEmY1WtGBruoDq7gH1tlhpVsVwj7pwowh1_PpcEM9utut6tavo3Inv0wvedycittpJjV9CxWqT5q-4xYxK_15-CIYSybjslLhxuz1Uj6xdDZLbXQPtIFuSi9cZlJ_UPEViXgkLUrZ_1U1df0LDMUxrwkfCWWt9fBNZbWWg8PymTGFZU-1JHw0I4QN3ZV93s23L-wYw7XoYEEo00kjYWT1qRafKlvjTnzrlpoetkKrOnsHatJmGVXTX_M6IPCQmaAfGeAchTBbMoz72Q8hBrU8ad3BJvMDqHBtqI--zQ';
  colorClips[5] = 'https://00e9e64bace75cc73bb80402bac9c5fdc25fa40333e75d253b-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fyellow.mp3?qk=AD5uMEv0zelndqMEDFAhVQaxRAw1zKK_uANCXZEnJ5NWkWEKlTFybmQHJenYqva8mQN_BIyAY_U4awwVU1OE18fEKJ74Y8ovQjEfr9SnUaCrjNJN3VX8ZUtNwZcCTIyU1BKTqv2OnEtXN134TzjP_NUI_ymiV5VIb5tDVRZnG1JBM0de4oP8HizbViX5SlQnttFBS8kxWSxPqWBkxDuLEYQUVjMqQqgINL1waJfP39w_AeogjGSslE-97g5ALY7eoAx4vn95cYD2XvlErW6-lxs0V3iS1SwVL_qGGRpi9XH5iHPEv4VvrrkgpIQ9mr5fj5n2motFBDmdwmG3d2PnBrwNBNkWWmJG4SW6ZyyeWOZb6QCaB5tuuZgr7zQgHL8QM5A4Lx96z_AWFYT6JmfX6UWSMWCZVAM9YBPrmh8U-S8oqGeuMoaJmNhjaTmhoxsEPAErd1eEKXOhp2JrxsB46tf1n0mOQMzcpIaoh8OGDfPXKD54DFWJagwzoIcFISkVaxfPleKBRrS33IQeRUOEMR_-KmgA-km6xgzgeTnNWz4Ce1USdtFc30pfqgXqh5o1M4E39NpNxc7EtCx6uK1kxp_ekjgBTewuf82V3XqQEOwuPe2dH0wvTmeb5YIPgcVKz22_bpI28TxfQyZ-I5MpVrFBnP2tc3xhiXvJijTF1_4H0ZqLEDQub0FX55pmtjFm881d0E50N5pY9LkJYqC6Z4Lj2VKoQpLI_OC-lwyEz4yuBOrM-fxliDUQw67N0iDaCalOsBnYivdyqEW60Ifjq567NarGnnDMWw';


  // Create object toggle function.
  if (!didAddListener) {
      window.addEventListener('keypress', function (e) {
      // spacebar 
    if (e.which == 32) {
          if (cubeFace !== 0) audioElement2.play();
          cubeFace = 0;
          currentCell = 4;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[0];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
    }

    // up arrow / 'w' key
    if (e.which == 119) {

      if (currentCell > 2) {
          currentCell -= 3;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = state.state.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
      } else if (cubeFace == 0) {
          currentCell += 6;
          cubeFace += 3;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 3) {
          currentCell += 6;
          cubeFace += 2;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else {
          audioElement.src = outBoundSrc;
          audioElement.play();
      }
    }
    // down arrow / 's' key
    if (e.which == 115) {

      if (currentCell < 6) {
          currentCell += 3;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = state.state.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
      } else if (cubeFace == 0) {
          currentCell -= 6;
          cubeFace += 2;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 2) {
          currentCell -= 6;
          cubeFace += 3;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else {
          audioElement.src = outBoundSrc;
          audioElement.play();
      }
    }

      // left arrow / 'a' key
    if (e.which == 97) {
         
      if (currentCell !== 0 && currentCell !== 3 && currentCell !== 6) {
          currentCell -= 1;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = state.state.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
      } else if (cubeFace == 0) {
          currentCell += 2;
          cubeFace += 4;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 4) {
          currentCell += 2;
          cubeFace += 1;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else {
          audioElement.src = outBoundSrc;
          audioElement.play();
      }
    }
    // right arrow / 'd' key
    if (e.which == 100) {
        
      if (currentCell !== 2 && currentCell !== 5 && currentCell !== 8) {
          currentCell += 1;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = state.state.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();  
      } else if (cubeFace == 0) {
          currentCell -= 2;
          cubeFace += 1;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 1) {
          currentCell -= 2;
          cubeFace += 4;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else {
          audioElement.src = outBoundSrc;
          audioElement.play();
      }
    }

    console.log(cubeCell);
    console.log(currentCell);

  }, false);
  didAddListener = true
  }



}