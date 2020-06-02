import pandas as pd
# import re
# import numpy as np
# from langdetect import detect


class Data:
    def __init__(self):
        self.data = pd.read_excel("./data/clean_fake_job_postings.xlsx")
        self.predicted_data = pd.read_csv("./data/data_with_predictions.csv")

    def get_random_sample(self):
        # getting all fraud data
        fraud = self.data[self.data['fraudulent'] == 1]
        # getting all real data
        real = self.data[self.data['fraudulent'] == 0]
        # filtering only 30 rows from them to show initially
        fraud = fraud.iloc[0:30]
        real = real.iloc[0:30]
        # creating a small balanced data frame
        small_balanced_data = pd.concat([fraud, real])
        # randomly re-shuffling the data
        small_balanced_data_random = small_balanced_data.sample(frac=1).reset_index(drop=True)
        return small_balanced_data_random

    def get_predicted_random_sample(self):
        # getting all fraud data
        fraud = self.predicted_data[self.predicted_data['fraudulent'] == 1]
        # getting all real data
        real = self.predicted_data[self.predicted_data['fraudulent'] == 0]
        # filtering only 30 rows from them to show initially
        fraud = fraud.iloc[0:30]
        real = real.iloc[0:30]
        # creating a small balanced data frame
        small_balanced_data = pd.concat([fraud, real])
        # randomly re-shuffling the data
        small_balanced_data_random = small_balanced_data.sample(frac=1).reset_index(drop=True)
        return small_balanced_data_random

    def get_plot_data(self, col, boolean=False):
        # count number of fraudulent postings and total postings -> calculate fraction of postings that are fraud
        fraudcnt = self.data.groupby(col).fraudulent.sum().to_frame()
        totcnt = self.data.groupby(col).job_id.count().to_frame()
        frac = pd.merge(fraudcnt, totcnt, left_index=True, right_index=True)
        frac['frac'] = frac.fraudulent / frac.job_id

        # exclude if fewer than 10 total postings (else fraction may be close to 100%)
        frac = frac[frac.job_id > 10]

        # sort and take top 10
        frac['index_col'] = frac.index
        frac = frac.reset_index(drop=True)
        if not boolean:
            frac = frac.sort_values('frac').tail(10)

        data_list = []
        keys = []
        values = []
        # pd_dict = {}
        pd_dict = frac[['index_col', 'frac']].to_dict('records')
        for d in pd_dict:
            keys.append(d['index_col'])
            values.append(d['frac'])
        data_list.append(keys)
        data_list.append(values)
        return data_list

    def get_orig_plot_data(self, col, tail=False):
        # 1 vs 2 plots in the figure
        pd = {}
        if tail:
            num = 10
            tail = self.data[col].value_counts().tail(10)
            pd = tail.to_dict()
        else:
            num = 1000
            head = self.data[col].value_counts().head(10)
            pd = head.to_dict()
        l = []
        l.append(list(pd.keys()))
        l.append(list(pd.values()))
        return l

    # def clean_data(self):
    #     """
    #     This function is used to clean the original data.
    #     However, it is already used and cleaned excel file is saved for faster load
    #     The cleaned excel file is saved in ./data/clean_fake_job_postings.xlsx
    #     """
    #     # replace null to "missing"
    #     for c in self.data.columns:
    #         self.data[c] = np.where(self.data[c].isnull(), 'missing', self.data[c])
    #
    #     # separate location attributes
    #     self.data['country'] = self.data.location.str.split(',').str[0]
    #     self.data['state'] = self.data.location.str.split(', ').str[1]
    #     self.data['city'] = self.data.location.str.split(', ').str[2]
    #
    #     # drop non-english postings
    #     self.data['language'] = self.data['description'].apply(lambda x: detect(x))
    #     self.data = self.data[self.data.language == 'en']
    #
    #     # spot cleanup for nyc abbreviations
    #     self.data.city = np.where(self.data.city == 'nyc', 'new york city', self.data.city)
    #     self.data.city = np.where(self.data.city == 'ny', 'new york city', self.data.city)
    #     self.data.city = np.where(self.data.city == 'new york', 'new york city', self.data.city)
    #
    #     # text cleaning
    #     text_columns = ['country', 'state', 'city', 'title', 'department', 'company_profile', 'description',
    #                     'requirements',
    #                     'benefits', 'required_experience', 'employment_type', 'required_education', 'industry',
    #                     'function']
    #     for c in text_columns:
    #         self.data[c] = self.data[c].apply(lambda x: re.sub(r'â€™', '', str(x)))  # remove specific character used for apostrophe
    #         # replace with '' before ascii removal so contractions together
    #         self.data[c] = self.data[c].str.replace('([A-Z])((?=[a-z]))',
    #                                   r' \1')  # if lower case followed by upper case, separate by space
    #         # works for a.A as well
    #         self.data[c] = self.data[c].str.lower()  # downcase
    #         self.data[c] = np.where(self.data[c] == '', 'missing', self.data[c])  # empty strings mark as missing
    #         self.data[c] = self.data[c].apply(
    #           lambda x: ''.join([" " if ord(i) < 32 or ord(i) > 126 else i for i in str(x)]))  # remove non-ascii
    #         self.data[c] = self.data[c].apply(lambda x: re.sub('http[^\s]+ ', ' ', str(x)))  # remove URLs
    #         self.data[c] = self.data[c].apply(lambda x: re.sub('url[^\s]+ ', ' ', str(x)))  # remove URLs
    #         self.data[c] = self.data[c].apply(
    #           lambda x: re.sub(r'[^\w\s]', '', x))  # remove punctuation. Replace with '' so don't separate contractions
    #         self.data[c] = self.data[c].apply(lambda x: re.sub(' +', ' ', x))  # remove double and triple spaces
    #         self.data[c] = self.data[c].apply(lambda x: str(x).strip())  # remove white space trailing/leading
    #
    #     # redefine education bins
    #     self.data['education_bin'] = np.where(self.data.required_education.isin(['some high school coursework']),
    #                                    'less than high school', self.data.required_education)
    #     self.data.education_bin = np.where(self.data.required_education.isin(['high school or equivalent']), 'high school',
    #                                 self.data.education_bin)
    #     self.data.education_bin = np.where(self.data.required_education.isin(['vocational hs diploma', 'vocational degree',
    #                                                             'vocational']), 'vocational', self.data.education_bin)
    #     self.data.education_bin = np.where(self.data.required_education.isin(['some college coursework completed']), 'some college',
    #                                 self.data.education_bin)
    #     self.data.education_bin = np.where(self.data.required_education.isin(['unspecified']), "missing", self.data.education_bin)
    #
    #     # drop salary range variable
    #     del self.data['salary_range']
    #     self.data.fraudulent = pd.to_numeric(self.data.fraudulent)
