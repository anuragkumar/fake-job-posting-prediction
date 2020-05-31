# Fake Job Posting Prediction

In this project, we have predicted fake job postings from a list of given jobs posted. The dataset has been picked from [Kaggle](https://www.kaggle.com/shivamb/real-or-fake-fake-jobposting-prediction) which consists for 17,880 rows of job postings. This document describes **Topic Modelling technique** used in conjuction with **Classification Models** to predict fake jobs out of real ones with high accuracy.


# Data

The dataset contains:
 - 17,880 rows
 - 18 features
	 - 5 features (title, company_profile, description, requirements and benefits) are long texts
	 - Rest 13 features are mainly numeric fields or categorical data

The dataset is provided with **Fraudulent** column where value of 1 denotes the job is a fraud and 0 for real jobs.

Dataset contains lot of missing values which are used as a valid observation. It could mean that fake posts often have missing fields.

## Data Cleaning
Following are the steps performed for data engineering:

 - Replace null to string "missing" - instead of dropping missing, use as valid observation. It could mean that fake posts often have missing data
 - Separate country, state and city from location column
 - Drop non-english text entries
 - Clean text columns -  separate sentences, remove URLs, non-ascii characters, punctuation, extra spaces and white space
 - Redefine education bins - some rows have "some high school coursework" or "high school or equivalent" etc. which are replaced with "less than high school" for generalizing it
 - Drop salary column: it is very often missing and unsure what units are used in foreign countries, inconsistent time frame. There is no way to standardize this column for such wide range of values

## EDA
Exploratory Data Analysis of this dataset can be found at this URL.
It also contains detailed description of various analysis and insights found about the data.

# Modeling
## Topic Modeling
We have used topic Latent Dirichlet Allocation (LDA) to find the number of topics and generate probability of each row. Later, we have used this extra feature in our classification models explained later.
Sections of the code is adapted from [link](https://www.machinelearningplus.com/nlp/topic-modeling-gensim-python/#11createthedictionaryandcorpusneededfortopicmodeling).

Here are the steps performed in Topic Modeling
 - Combine text fields into single string
 - Tokenize, remove stop words, lemmatize based on POS
 - Build term frequency corpus
 - Build LDA model
	 - Tune based on topic coherence. Specifically C_V coherence value
- Add topic probabilities as metadata to the dataset

**Topic Coherence** is the degree of sementic similarity between high scoring words in the topic. It is modern alternative to **Perplexity** which is how surprised a model is by the new data (normalized log-likelihood of held out test data).
**CV_coherence** is a "measure based on sliding window, one-set segmentation of the top words and an indirect confirmation measure that uses Normalized Pointwise Mutual Information (NPMI) and cosine similarity." [Link](https://towardsdatascience.com/evaluate-topic-model-in-python-latent-dirichlet-allocation-lda-7d57484bb5d0)

Parameters:
 - Number of topics
 - Alpha
 - Eta
	 - Selecting alpha and eta with built-in auto method which learns asymetric prior from the data

From [Link](https://www.thoughtvector.io/blog/lda-alpha-and-beta-parameters-the-intuition/): (assuming symmetric data), alpha represents document-topic density - with higher alpha, documents are made up of more topics and with lower alpha, documents contains fewer topics. Beta represents topic-word density - with high beta, topics are made up of most of the words in the corpus, and with low beta, they consists of few words.

### Coherence Score Graph

![Coherence Score](https://github.com/anuragkumar/fake-job-posting-prediction/blob/master/metrics_images/Coherence_Score.png)

Maximum coherence score with 22 topics. 

### Visualize topics using LDAvis
The topics visualization can be found at [link].

### Merge Topic Probabilities with the Original Data
Following are the steps performed:
 - We created a blank dataframe and initialized with single column with value 0
 - Looped through LDA result, create series with topic probabilities and append onto the dataframe
 - Merged with the original dataset
 - Finally, replaced missing with 0s: if topic is missing, then 0% probability in that topic

# Classification
## Dummy Variables
- All variables are categorical, create dummies and drop one level to avoid collinearity
- There are many values for countries, so created dummies only if more that 100 posts in that country

## SMOTE: Class Imbalance
SMOTE sampling on the training data such that even number of observations with each class. This function also does 80/20 train/test split.

SMOTE: synethic minority over-sampling technique  
Synthesize new examples for the minority class rather than oversample, which doesn't add any new information.

"… SMOTE first selects a minority class instance a at random and finds its k nearest minority class neighbors. The synthetic instance is then created by choosing one of the k nearest neighbors b at random and connecting a and b to form a line segment in the feature space. The synthetic instances are generated as a convex combination of the two chosen instances a and b"    
     
SMOTE sampling on training data:
- Original number of fraudulent in data is 687
- Length of oversampled data is 26956
- Number of real in oversampled data 13478
- Number of fraudulent in oversampled data 13478
- Proportion of real data in oversampled data is 0.5
- Proportion of fraudulent data in oversampled data is  0.5

## Classification Models Used

 - **Unregularized Logistic Regression**
 - **Regularized (Lasso) Logistic Regression with Cross-Validation**
 - **Ensemble Tree Models**

### Unregularized Logistic Regression
We have used three versions:
- original imbalanced dataset
- balanced weighting
- SMOTE

#### Metrics for imbalanced data
| Metric | Value |
|--|--|
| Accuracy | 0.9551101072840203 |
| TPR Recall | 0.19653179190751446 |
| TNR | 0.9940635203324428 |
| FPR | 0.005936479667557139 |
| FNR | 0.8034682080924855 |
| Precision | 0.6296296296296297 |
| Area under ROC | 0.5952976561199786 |
| Area under PR | 0.16298560467949763 |

#### Metrics for balanced class weighting
| Metric | Value |
|--|--|
| Accuracy | 0.8215697346132129 |
| TPR Recall | 0.8092485549132948|
| TNR | 0.8222024339566637|
| FPR | 0.1777975660433363|
| FNR | 0.1907514450867052|
| Precision | 0.18944519621109607|
| Area under ROC | 0.8157254944349792|
| Area under PR | 0.16262502145543048|

#### Metric for SMOTE
| Metric | Value |
|--|--|
| Accuracy | 0.8204404291360813|
| TPR Recall | 0.7976878612716763|
| TNR | 0.8216087859899079|
| FPR | 0.178391214010092|
| FNR | 0.2023121387283237|
| Precision | 0.18673883626522328|
| Area under ROC | 0.8096483236307922|
| Area under PR | 0.1588407258416689|

#### Comparing baseline models
We can see that imbalanced model is heavily biased towards accuracy and precision, not recall.
SMOTE and class weighting are very similar.

![Comparing Baseline Models Unregularized LR](https://github.com/anuragkumar/fake-job-posting-prediction/blob/master/metrics_images/Comapring_baseline_models_unregularized_LR.png)

### Regularized (Lasso) Logistic Regression with Cross-Validation
-   Cross Validation to choose regularization parameter
-   No need to scale or normalize since all features are categorical or probabilities between 0 and 1
-   refit = true means will refit with the best selected parameters after CV
-   Fit without intercept so can include all topic levels (which sum to 1). Still need to remove 1 level from the other dummies.
-   Increasing max_iter even to 5000 does not get rid of convergence warning

Iterations: repeat the following with each of these 4 scoring metrics: **roc auc, accuracy, precision, recall**

1.  Balanced weighting
    -   class_weighting = 'balanced'
    -   penalty = 'l1'
    -   fit(X_train, y_train)
2.  SMOTE
    -   penalty = 'l1'
    -   fit(os_data_X, os_data_y)
3.  SMOTE with elastic net penalty
    -   SMOTE better than balanced weighting so keep with that
    -   penalty = 'elasticnet'
    -   l1_ratios = [0, .25, .5, .75, 1]
    -   fit(os_data_X, os_data_y)

#### Balanced Weighting

![Balanced Weighting Regularized LR](https://github.com/anuragkumar/fake-job-posting-prediction/blob/master/metrics_images/Balanced_weighting_Regularized_LR.png)

Insights:
1. accuracy FPR = 0, FNR = 1. Almost always predicts real. 
2. ROC, precision, recall all pretty similar. 
3. Recall does the best at minimizing FNR (as is its purpose) and everything else is just slightly worse
4. Precision more balanced, unclear which is better
5. Baseline only slightly worse than tuned results      
          
Best: Recall or precision

#### SMOTE

![SMOTE Regularized LR](https://github.com/anuragkumar/fake-job-posting-prediction/blob/master/metrics_images/SMOTE_Regularized_LR.png)

Insights:
1. best model: ROC (all effectively the same incl baseline)      
         
Best: ROC   

#### Elastic Net

![Elastic Net Metric](https://github.com/anuragkumar/fake-job-posting-prediction/blob/master/metrics_images/Elastic_net_Metric.png)

Insights:
1. Not materially different from lasso smote, not using

#### Comparing SMOTE vs Class Imbalance

![Comparing SMOTE vs Class Imbalance Regularized LR](https://github.com/anuragkumar/fake-job-posting-prediction/blob/master/metrics_images/Comapring_SMOTE_vs_Class_Imbalance_Regularized_LR.png)

Very similar with some tradeoffs. Ultimately choosing SMOTE ROC as best model because most balanced between tradeoffs. The benefits of class weighting precision are small (precision, FPR) and worse in many areas (FNR, TPR)  
Also, SMOTE was consistent across all 4 metrics and thus is a very robust model, likely would perform well on new data.

#### Choosing Best Model: SMOTE ROC
#####  ROC Curve

![Best Model ROC SMOTE ROC](https://github.com/anuragkumar/fake-job-posting-prediction/blob/master/metrics_images/Best_Model_ROC_SMOTE_ROC.png)

The lines show the 0.5 threshold. The threshold is appropriate because it reaches close to the top left of the graph and thus has a good tradeoff between FPR and TPR

### Ensemble Tree Models

Code modified from [https://www.analyticsvidhya.com/blog/2016/03/complete-guide-parameter-tuning-xgboost-with-codes-python/](https://www.analyticsvidhya.com/blog/2016/03/complete-guide-parameter-tuning-xgboost-with-codes-python/) and [https://machinelearningmastery.com/xgboost-for-imbalanced-classification/](https://machinelearningmastery.com/xgboost-for-imbalanced-classification/)  
Specifically, guidance in how to and in what order to tune parameters from [https://www.analyticsvidhya.com/blog/2016/03/complete-guide-parameter-tuning-xgboost-with-codes-python/](https://www.analyticsvidhya.com/blog/2016/03/complete-guide-parameter-tuning-xgboost-with-codes-python/).

We did train/test split + SMOTE sampling.
No need to drop one level of dummies in this case.

#### Baseline Model
Results with all default values. 3 iterations: 
- Unbalanced original data
- SMOTE
- Balanced class weighting.

#### Before Parameter Tuning
##### Unbalanced Metrics
| Metric | Value |
| -- | -- |
|Accuracy | 0.9757199322416714|
|TPR/recall | 0.5895953757225434|
|TNR | 0.9955476402493322|
|FPR | 0.004452359750667854|
|FNR | 0.41040462427745666|
|Precision | 0.8717948717948718|
|Area under ROC | 0.7925715079859378|
|Area Under PR | 0.5340513972079693|

##### SMOTE Metrics
| Metric | Value |
| -- | -- |
|Accuracy | 0.9717673630717109|
|TPR/recall | 0.6936416184971098|
|TNR | 0.9860492727812408|
|FPR | 0.013950727218759276|
|FNR | 0.3063583815028902|
|Precision | 0.718562874251497|
|Area under ROC | 0.8398454456391753|
|Area Under PR | 0.5133884126597368|

##### Balanced Weighting
| Metric | Value |
| -- | -- |
| Accuracy | 0.9599096555618295 |
| TPR/recall | 0.815028901734104 |
| TNR | 0.9673493618284358 |
| FPR | 0.032650638171564265 |
| FNR | 0.18497109826589594 |
| Precision | 0.5617529880478087 |
| Area under ROC | 0.89118913178127 |
| Area Under PR | 0.4668793647115093 |

#### Comapring Baselines

![Comparing baselines models before parameter tuning](https://github.com/anuragkumar/fake-job-posting-prediction/blob/master/metrics_images/Comapring_Baseline_models_enseble_tree_before_parameter_tuning.png)

Insights:
-   Imbalanced does better than in logistic - more fake predictions
-   Class weighting relatively poor precision but good recall/TPR
-   SMOTE fairly balanced

#### Parameter Tuning
Ideally would do full grid search with all parameters, but resource needs too much so doing sequential tuning instead.
Tune most parameters with high learning rate (0.3) and low number of estimators (100) so that reasonable amount of time. Last step is to select correct learning rate and estimator number.

Parameters:
-   Max depth: maximum tree depth. Larger makes trees more complex, more likely to overfit
-   Min child weight: minimum sum of weight needed in a child. Will stop splitting nodes if result is below this minimum
-   Gamma: minimum loss reduction required for a tree split
-   Subsample: percent of data sampled to grow trees at each iteration. Smaller subsamples prevents overfitting
-   Colsample_bytree: percent of features used when constructing tree for each tree created
-   Alpha: L1 regularization
-   Lambda: L2 regularization
-   Learning rate: how quickly trees learn/update in iterations.
-   Number of estimators: number of trees/iterations

Fit models with each of the 4 scoring metrics for both SMOTE and class weighted data.


#### Comparing Models
##### SMOTE

![Ensemble Tree SMOTE Parameter Tuned](https://github.com/anuragkumar/fake-job-posting-prediction/blob/master/metrics_images/Ensemble_Tree_Model_Parameter_Tuned_SMOTE.png)

Insights:
- All very similar, ROC slightly better across most metrics
- Recall results in worse precision
- Concerns about overfitting: when training, ROC was 0.999 but 0.83 on testing data. Worried that if get new test data, won't perform well because too variable.       
         
Best: ROC

##### Balanced Weighting

![Ensemble Tree Balanced Weighting Parameter Tuned](https://github.com/anuragkumar/fake-job-posting-prediction/blob/master/metrics_images/Ensemble_Tree_Model_Parameter_Tuned_Balanced_Weighting.png)

Insights:
- ROC overall most balanced. Very similar to precision
- Recall much higher TPR, FPR. Low precision    
- Baseline better ROC and FNR than tuned models. But worse precision.         
           
Best: ROC 

#### Comparing Class Weighted ROC vs SMOTE

![Ensemble Tree SMOTE vs Class Weighted ROC](https://github.com/anuragkumar/fake-job-posting-prediction/blob/master/metrics_images/Comparing_xgboost_SMOTE_vs_Weighted_ROC.png)

Class Weighting better in all categories and less overfit. 

### Comparing xgboost and Logistic Regression

![xgboost vs LR](https://github.com/anuragkumar/fake-job-posting-prediction/blob/master/metrics_images/Comparing_xgboost_vs_LR.png)

Insights:
XGBoost overall better for accuracy, TNR, precision, FPR, ROC. Worse for TPR and FNR, but by small amounts

**Best model: XGBoost, class weighting, ROC scoring**

Thoughts on tradeoffs:  
Originally thought we wanted to minimize FNR/maximize recall so that job seekers don't think a fake job is real. However, never do a good job in any model of really minimizing FNR.  
However, can do a very good job of maximizing precision and minimizing FPR. Thus very rarely predict a real job is fake. This actually has benefits to the job seekers (don't miss out on opportunities) and the companies (don't have their posts labeled as fake).  
Would need disclaimers that this does not guarentee the post is not fake, just provides a first pass to filter some out. Please still be vigilant.


## Overall Best Model : ## XGBoost Class Weighting, ROC Scoring
### Metrics
| Metric | Value |
|  -- | -- |
| Accuracy | 0.9776962168266516 |
| TPR/recall | 0.7167630057803468 |
| TNR | 0.9910952804986642 |
| FPR | 0.008904719501335707 |
| FNR | 0.2832369942196532 |
| Precision | 0.8051948051948052 |
| Area under ROC | 0.8539291431395054 |
| Area Under PR | 0.5909678409050111 |

### ROC Curve

![Best Model ROC](https://github.com/anuragkumar/fake-job-posting-prediction/blob/master/metrics_images/best_Model_xgboost_class_weighting_roc_scoring_ROC.png)

### Feature Importance (Top 20)

![Feature Importance Best Model](https://github.com/anuragkumar/fake-job-posting-prediction/blob/master/metrics_images/Best_Model_xgboost_Feature_Importance.png)

## Merged Predictions with full Test Data and is displayed in Dashboard
[link]
