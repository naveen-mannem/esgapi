# esgapi v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [AuthenticateOTP](#authenticateotp)
	
- [AverageSd](#averagesd)
	- [Create average sd](#create-average-sd)
	- [Delete average sd](#delete-average-sd)
	- [Retrieve average sd](#retrieve-average-sd)
	- [Retrieve average sds](#retrieve-average-sds)
	- [Update average sd](#update-average-sd)
	
- [Batch](#batch)
	- [Create batch](#create-batch)
	- [Delete batch](#delete-batch)
	- [Retrieve batch](#retrieve-batch)
	- [Retrieve batches](#retrieve-batches)
	- [Update batch](#update-batch)
	
- [BoardMatrixDatapoints](#boardmatrixdatapoints)
	- [Create board matrix datapoints](#create-board-matrix-datapoints)
	- [Delete board matrix datapoints](#delete-board-matrix-datapoints)
	- [Retrieve board matrix datapoints](#retrieve-board-matrix-datapoints)
	- [Update board matrix datapoints](#update-board-matrix-datapoints)
	
- [BoardMembers](#boardmembers)
	- [Create board members](#create-board-members)
	- [Delete board members](#delete-board-members)
	- [Retrieve board members](#retrieve-board-members)
	- [Update board members](#update-board-members)
	
- [Categories](#categories)
	- [Create categories](#create-categories)
	- [Delete categories](#delete-categories)
	- [Retrieve categories](#retrieve-categories)
	- [Update categories](#update-categories)
	
- [Companies](#companies)
	- [Create companies](#create-companies)
	- [Delete companies](#delete-companies)
	- [Retrieve companies](#retrieve-companies)
	- [Update companies](#update-companies)
	
- [CompanyRepAssignment](#companyrepassignment)
	- [Create company rep assignment](#create-company-rep-assignment)
	- [Delete company rep assignment](#delete-company-rep-assignment)
	- [Retrieve company rep assignment](#retrieve-company-rep-assignment)
	- [Retrieve company rep assignments](#retrieve-company-rep-assignments)
	- [Update company rep assignment](#update-company-rep-assignment)
	
- [CompanyTaxonomies](#companytaxonomies)
	- [Create company taxonomies](#create-company-taxonomies)
	- [Delete company taxonomies](#delete-company-taxonomies)
	- [Retrieve company taxonomies](#retrieve-company-taxonomies)
	- [Update company taxonomies](#update-company-taxonomies)
	
- [Controversy](#controversy)
	- [Create controversy](#create-controversy)
	- [Delete controversy](#delete-controversy)
	- [Retrieve controversies](#retrieve-controversies)
	- [Retrieve controversy](#retrieve-controversy)
	- [Update controversy](#update-controversy)
	
- [Datapoints](#datapoints)
	- [Create datapoints](#create-datapoints)
	- [Delete datapoints](#delete-datapoints)
	- [Retrieve datapoints](#retrieve-datapoints)
	- [Update datapoints](#update-datapoints)
	
- [DerivedDatapoints](#deriveddatapoints)
	- [Create derived datapoints](#create-derived-datapoints)
	- [Delete derived datapoints](#delete-derived-datapoints)
	- [Retrieve derived datapoints](#retrieve-derived-datapoints)
	- [Update derived datapoints](#update-derived-datapoints)
	
- [Error](#error)
	- [Create error](#create-error)
	- [Delete error](#delete-error)
	- [Retrieve error](#retrieve-error)
	- [Retrieve errors](#retrieve-errors)
	- [Update error](#update-error)
	
- [ErrorDetails](#errordetails)
	- [Create error details](#create-error-details)
	- [Delete error details](#delete-error-details)
	- [Retrieve error details](#retrieve-error-details)
	- [Update error details](#update-error-details)
	
- [Functions](#functions)
	- [Create functions](#create-functions)
	- [Delete functions](#delete-functions)
	- [Retrieve functions](#retrieve-functions)
	- [Update functions](#update-functions)
	
- [GroupAnalyst](#groupanalyst)
	- [Create group analyst](#create-group-analyst)
	- [Delete group analyst](#delete-group-analyst)
	- [Retrieve group analyst](#retrieve-group-analyst)
	- [Retrieve group analysts](#retrieve-group-analysts)
	- [Update group analyst](#update-group-analyst)
	
- [GroupQa](#groupqa)
	- [Create group qa](#create-group-qa)
	- [Delete group qa](#delete-group-qa)
	- [Retrieve group qa](#retrieve-group-qa)
	- [Retrieve group qas](#retrieve-group-qas)
	- [Update group qa](#update-group-qa)
	
- [Groups](#groups)
	- [Create groups](#create-groups)
	- [Delete groups](#delete-groups)
	- [Retrieve groups](#retrieve-groups)
	- [Update groups](#update-groups)
	
- [KeyIssues](#keyissues)
	- [Create key issues](#create-key-issues)
	- [Delete key issues](#delete-key-issues)
	- [Retrieve key issues](#retrieve-key-issues)
	- [Update key issues](#update-key-issues)
	
- [Kmp](#kmp)
	- [Create kmp](#create-kmp)
	- [Delete kmp](#delete-kmp)
	- [Retrieve kmp](#retrieve-kmp)
	- [Retrieve kmps](#retrieve-kmps)
	- [Update kmp](#update-kmp)
	
- [KmpMatrixDataPoints](#kmpmatrixdatapoints)
	- [Create kmp matrix data points](#create-kmp-matrix-data-points)
	- [Delete kmp matrix data points](#delete-kmp-matrix-data-points)
	- [Retrieve kmp matrix data points](#retrieve-kmp-matrix-data-points)
	- [Update kmp matrix data points](#update-kmp-matrix-data-points)
	
- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [PolarityRule](#polarityrule)
	- [Create polarity rule](#create-polarity-rule)
	- [Delete polarity rule](#delete-polarity-rule)
	- [Retrieve polarity rule](#retrieve-polarity-rule)
	- [Retrieve polarity rules](#retrieve-polarity-rules)
	- [Update polarity rule](#update-polarity-rule)
	
- [Reference](#reference)
	- [Create reference](#create-reference)
	- [Delete reference](#delete-reference)
	- [Retrieve reference](#retrieve-reference)
	- [Retrieve references](#retrieve-references)
	- [Update reference](#update-reference)
	
- [Role](#role)
	- [Create role](#create-role)
	- [Delete role](#delete-role)
	- [Retrieve role](#retrieve-role)
	- [Retrieve roles](#retrieve-roles)
	- [Update role](#update-role)
	
- [Rules](#rules)
	- [Create rules](#create-rules)
	- [Delete rules](#delete-rules)
	- [Retrieve rules](#retrieve-rules)
	- [Update rules](#update-rules)
	
- [StandaloneDatapoints](#standalonedatapoints)
	- [Create standalone datapoints](#create-standalone-datapoints)
	- [Delete standalone datapoints](#delete-standalone-datapoints)
	- [Retrieve standalone datapoints](#retrieve-standalone-datapoints)
	- [Update standalone datapoints](#update-standalone-datapoints)
	
- [TaskAssignment](#taskassignment)
	- [Create task assignment](#create-task-assignment)
	- [Delete task assignment](#delete-task-assignment)
	- [Retrieve task assignment](#retrieve-task-assignment)
	- [Retrieve task assignments](#retrieve-task-assignments)
	- [Update task assignment](#update-task-assignment)
	
- [TaskSlaLog](#taskslalog)
	- [Create task sla log](#create-task-sla-log)
	- [Delete task sla log](#delete-task-sla-log)
	- [Retrieve task sla log](#retrieve-task-sla-log)
	- [Retrieve task sla logs](#retrieve-task-sla-logs)
	- [Update task sla log](#update-task-sla-log)
	
- [Taxonomies](#taxonomies)
	- [Create taxonomies](#create-taxonomies)
	- [Delete taxonomies](#delete-taxonomies)
	- [Retrieve taxonomies](#retrieve-taxonomies)
	- [Update taxonomies](#update-taxonomies)
	
- [Themes](#themes)
	- [Create themes](#create-themes)
	- [Delete themes](#delete-themes)
	- [Retrieve themes](#retrieve-themes)
	- [Update themes](#update-themes)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	
- [ValidationRules](#validationrules)
	- [Create validation rules](#create-validation-rules)
	- [Delete validation rules](#delete-validation-rules)
	- [Retrieve validation rules](#retrieve-validation-rules)
	- [Update validation rules](#update-validation-rules)
	
- [Validations](#validations)
	- [Create validations](#create-validations)
	- [Delete validations](#delete-validations)
	- [Retrieve validations](#retrieve-validations)
	- [Update validations](#update-validations)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

## AuthenticateOTP



	POST /auth/auth-otp

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and otp.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# AverageSd

## Create average sd



	POST /average_sd


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| companyId			| 			|  <p>Average sd's companyId.</p>							|
| year			| 			|  <p>Average sd's year.</p>							|
| stdDeviation			| 			|  <p>Average sd's stdDeviation.</p>							|
| status			| 			|  <p>Average sd's status.</p>							|

## Delete average sd



	DELETE /average_sd/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve average sd



	GET /average_sd/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve average sds



	GET /average_sd


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update average sd



	PUT /average_sd/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| companyId			| 			|  <p>Average sd's companyId.</p>							|
| year			| 			|  <p>Average sd's year.</p>							|
| stdDeviation			| 			|  <p>Average sd's stdDeviation.</p>							|
| status			| 			|  <p>Average sd's status.</p>							|

# Batch

## Create batch



	POST /batch


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| batchName			| 			|  <p>Batch's batchName.</p>							|
| batchSLA			| 			|  <p>Batch's batchSLA.</p>							|
| status			| 			|  <p>Batch's status.</p>							|
| createdBy			| 			|  <p>Batch's createdBy.</p>							|
| createdAt			| 			|  <p>Batch's createdAt.</p>							|
| updatedAt			| 			|  <p>Batch's updatedAt.</p>							|

## Delete batch



	DELETE /batch/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve batch



	GET /batch/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve batches



	GET /batch


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update batch



	PUT /batch/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| batchName			| 			|  <p>Batch's batchName.</p>							|
| batchSLA			| 			|  <p>Batch's batchSLA.</p>							|
| status			| 			|  <p>Batch's status.</p>							|
| createdBy			| 			|  <p>Batch's createdBy.</p>							|
| createdAt			| 			|  <p>Batch's createdAt.</p>							|
| updatedAt			| 			|  <p>Batch's updatedAt.</p>							|

# BoardMatrixDatapoints

## Create board matrix datapoints



	POST /boardMatrixDatapoints


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| dpCodeId			| 			|  <p>Board matrix datapoints's dpCodeId.</p>							|
| boardMemberId			| 			|  <p>Board matrix datapoints's boardMemberId.</p>							|
| year			| 			|  <p>Board matrix datapoints's year.</p>							|
| response			| 			|  <p>Board matrix datapoints's response.</p>							|
| status			| 			|  <p>Board matrix datapoints's status.</p>							|
| createdAt			| 			|  <p>Board matrix datapoints's createdAt.</p>							|
| updatedAt			| 			|  <p>Board matrix datapoints's updatedAt.</p>							|

## Delete board matrix datapoints



	DELETE /boardMatrixDatapoints/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve board matrix datapoints



	GET /boardMatrixDatapoints


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update board matrix datapoints



	PUT /boardMatrixDatapoints/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| dpCodeId			| 			|  <p>Board matrix datapoints's dpCodeId.</p>							|
| boardMemberId			| 			|  <p>Board matrix datapoints's boardMemberId.</p>							|
| year			| 			|  <p>Board matrix datapoints's year.</p>							|
| response			| 			|  <p>Board matrix datapoints's response.</p>							|
| status			| 			|  <p>Board matrix datapoints's status.</p>							|
| createdAt			| 			|  <p>Board matrix datapoints's createdAt.</p>							|
| updatedAt			| 			|  <p>Board matrix datapoints's updatedAt.</p>							|

# BoardMembers

## Create board members



	POST /boardMembers


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| companyId			| 			|  <p>Board members's companyId.</p>							|
| boardMemberName			| 			|  <p>Board members's boardMemberName.</p>							|
| memberStatus			| 			|  <p>Board members's memberStatus.</p>							|
| status			| 			|  <p>Board members's status.</p>							|
| createdAt			| 			|  <p>Board members's createdAt.</p>							|
| updatedAt			| 			|  <p>Board members's updatedAt.</p>							|

## Delete board members



	DELETE /boardMembers/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve board members



	GET /boardMembers


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update board members



	PUT /boardMembers/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| companyId			| 			|  <p>Board members's companyId.</p>							|
| boardMemberName			| 			|  <p>Board members's boardMemberName.</p>							|
| memberStatus			| 			|  <p>Board members's memberStatus.</p>							|
| status			| 			|  <p>Board members's status.</p>							|
| createdAt			| 			|  <p>Board members's createdAt.</p>							|
| updatedAt			| 			|  <p>Board members's updatedAt.</p>							|

# Categories

## Create categories



	POST /categories


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| categoryName			| 			|  <p>Categories's categoryName.</p>							|
| categoryCode			| 			|  <p>Categories's categoryCode.</p>							|
| categoryDescription			| 			|  <p>Categories's categoryDescription.</p>							|
| status			| 			|  <p>Categories's status.</p>							|

## Delete categories



	DELETE /categories/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve categories



	GET /categories


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update categories



	PUT /categories/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| categoryName			| 			|  <p>Categories's categoryName.</p>							|
| categoryCode			| 			|  <p>Categories's categoryCode.</p>							|
| categoryDescription			| 			|  <p>Categories's categoryDescription.</p>							|
| status			| 			|  <p>Categories's status.</p>							|

# Companies

## Create companies



	POST /companies


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| companyName			| 			|  <p>Companies's companyName.</p>							|
| cin			| 			|  <p>Companies's cin.</p>							|
| nicCode			| 			|  <p>Companies's nicCode.</p>							|
| nic			| 			|  <p>Companies's nic.</p>							|
| nicIndustry			| 			|  <p>Companies's nicIndustry.</p>							|
| isinCode			| 			|  <p>Companies's isinCode.</p>							|
| cmieProwessCode			| 			|  <p>Companies's cmieProwessCode.</p>							|
| socialAnalystName			| 			|  <p>Companies's socialAnalystName.</p>							|
| socialQAName			| 			|  <p>Companies's socialQAName.</p>							|
| status			| 			|  <p>Companies's status.</p>							|

## Delete companies



	DELETE /companies/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve companies



	GET /companies


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update companies



	PUT /companies/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| companyName			| 			|  <p>Companies's companyName.</p>							|
| cin			| 			|  <p>Companies's cin.</p>							|
| nicCode			| 			|  <p>Companies's nicCode.</p>							|
| nic			| 			|  <p>Companies's nic.</p>							|
| nicIndustry			| 			|  <p>Companies's nicIndustry.</p>							|
| isinCode			| 			|  <p>Companies's isinCode.</p>							|
| cmieProwessCode			| 			|  <p>Companies's cmieProwessCode.</p>							|
| socialAnalystName			| 			|  <p>Companies's socialAnalystName.</p>							|
| socialQAName			| 			|  <p>Companies's socialQAName.</p>							|
| status			| 			|  <p>Companies's status.</p>							|

# CompanyRepAssignment

## Create company rep assignment



	POST /companyRepAssignment


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| userId			| 			|  <p>Company rep assignment's userId.</p>							|
| assignedId			| 			|  <p>Company rep assignment's assignedId.</p>							|
| assignedDate			| 			|  <p>Company rep assignment's assignedDate.</p>							|
| status			| 			|  <p>Company rep assignment's status.</p>							|
| createdAt			| 			|  <p>Company rep assignment's createdAt.</p>							|
| updatedAt			| 			|  <p>Company rep assignment's updatedAt.</p>							|

## Delete company rep assignment



	DELETE /companyRepAssignment/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve company rep assignment



	GET /companyRepAssignment/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve company rep assignments



	GET /companyRepAssignment


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update company rep assignment



	PUT /companyRepAssignment/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| userId			| 			|  <p>Company rep assignment's userId.</p>							|
| assignedId			| 			|  <p>Company rep assignment's assignedId.</p>							|
| assignedDate			| 			|  <p>Company rep assignment's assignedDate.</p>							|
| status			| 			|  <p>Company rep assignment's status.</p>							|
| createdAt			| 			|  <p>Company rep assignment's createdAt.</p>							|
| updatedAt			| 			|  <p>Company rep assignment's updatedAt.</p>							|

# CompanyTaxonomies

## Create company taxonomies



	POST /company_taxonomies


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| companyId			| 			|  <p>Company taxonomies's companyId.</p>							|
| taxonomies			| 			|  <p>Company taxonomies's taxonomies.</p>							|
| status			| 			|  <p>Company taxonomies's status.</p>							|

## Delete company taxonomies



	DELETE /company_taxonomies/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve company taxonomies



	GET /company_taxonomies


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update company taxonomies



	PUT /company_taxonomies/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| companyId			| 			|  <p>Company taxonomies's companyId.</p>							|
| taxonomies			| 			|  <p>Company taxonomies's taxonomies.</p>							|
| status			| 			|  <p>Company taxonomies's status.</p>							|

# Controversy

## Create controversy



	POST /controversy


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| dpCodeId			| 			|  <p>Controversy's dpCodeId.</p>							|
| companyId			| 			|  <p>Controversy's companyId.</p>							|
| year			| 			|  <p>Controversy's year.</p>							|
| sourceName			| 			|  <p>Controversy's sourceName.</p>							|
| sourceUrl			| 			|  <p>Controversy's sourceUrl.</p>							|
| sourcePublicationDate			| 			|  <p>Controversy's sourcePublicationDate.</p>							|
| response			| 			|  <p>Controversy's response.</p>							|
| submittedDate			| 			|  <p>Controversy's submittedDate.</p>							|
| submittedBy			| 			|  <p>Controversy's submittedBy.</p>							|
| activeStatus			| 			|  <p>Controversy's activeStatus.</p>							|
| status			| 			|  <p>Controversy's status.</p>							|
| createdBy			| 			|  <p>Controversy's createdBy.</p>							|
| createdAt			| 			|  <p>Controversy's createdAt.</p>							|
| updatedAt			| 			|  <p>Controversy's updatedAt.</p>							|

## Delete controversy



	DELETE /controversy/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve controversies



	GET /controversy


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve controversy



	GET /controversy/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Update controversy



	PUT /controversy/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| dpCodeId			| 			|  <p>Controversy's dpCodeId.</p>							|
| companyId			| 			|  <p>Controversy's companyId.</p>							|
| year			| 			|  <p>Controversy's year.</p>							|
| sourceName			| 			|  <p>Controversy's sourceName.</p>							|
| sourceUrl			| 			|  <p>Controversy's sourceUrl.</p>							|
| sourcePublicationDate			| 			|  <p>Controversy's sourcePublicationDate.</p>							|
| response			| 			|  <p>Controversy's response.</p>							|
| submittedDate			| 			|  <p>Controversy's submittedDate.</p>							|
| submittedBy			| 			|  <p>Controversy's submittedBy.</p>							|
| activeStatus			| 			|  <p>Controversy's activeStatus.</p>							|
| status			| 			|  <p>Controversy's status.</p>							|
| createdBy			| 			|  <p>Controversy's createdBy.</p>							|
| createdAt			| 			|  <p>Controversy's createdAt.</p>							|
| updatedAt			| 			|  <p>Controversy's updatedAt.</p>							|

# Datapoints

## Create datapoints



	POST /datapoints


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Datapoints's name.</p>							|
| code			| 			|  <p>Datapoints's code.</p>							|
| description			| 			|  <p>Datapoints's description.</p>							|
| dataCollection			| 			|  <p>Datapoints's dataCollection.</p>							|
| unit			| 			|  <p>Datapoints's unit.</p>							|
| signal			| 			|  <p>Datapoints's signal.</p>							|
| percentile			| 			|  <p>Datapoints's percentile.</p>							|
| finalUnit			| 			|  <p>Datapoints's finalUnit.</p>							|
| keyIssueId			| 			|  <p>Datapoints's keyIssueId.</p>							|
| functionId			| 			|  <p>Datapoints's functionId.</p>							|
| dpType			| 			|  <p>Datapoints's dpType.</p>							|
| year			| 			|  <p>Datapoints's year.</p>							|
| companyTaxonomyId			| 			|  <p>Datapoints's companyTaxonomyId.</p>							|
| dpStatus			| 			|  <p>Datapoints's dpStatus.</p>							|
| sourceName			| 			|  <p>Datapoints's sourceName.</p>							|
| sourceUrl			| 			|  <p>Datapoints's sourceUrl.</p>							|
| sourcePublicationDate			| 			|  <p>Datapoints's sourcePublicationDate.</p>							|
| pageNumber			| 			|  <p>Datapoints's pageNumber.</p>							|
| textSnippet			| 			|  <p>Datapoints's textSnippet.</p>							|
| screenshotType			| 			|  <p>Datapoints's screenshotType.</p>							|
| filePath			| 			|  <p>Datapoints's filePath.</p>							|
| status			| 			|  <p>Datapoints's status.</p>							|

## Delete datapoints



	DELETE /datapoints/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve datapoints



	GET /datapoints


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update datapoints



	PUT /datapoints/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Datapoints's name.</p>							|
| code			| 			|  <p>Datapoints's code.</p>							|
| description			| 			|  <p>Datapoints's description.</p>							|
| dataCollection			| 			|  <p>Datapoints's dataCollection.</p>							|
| unit			| 			|  <p>Datapoints's unit.</p>							|
| signal			| 			|  <p>Datapoints's signal.</p>							|
| percentile			| 			|  <p>Datapoints's percentile.</p>							|
| finalUnit			| 			|  <p>Datapoints's finalUnit.</p>							|
| keyIssueId			| 			|  <p>Datapoints's keyIssueId.</p>							|
| functionId			| 			|  <p>Datapoints's functionId.</p>							|
| dpType			| 			|  <p>Datapoints's dpType.</p>							|
| year			| 			|  <p>Datapoints's year.</p>							|
| companyTaxonomyId			| 			|  <p>Datapoints's companyTaxonomyId.</p>							|
| dpStatus			| 			|  <p>Datapoints's dpStatus.</p>							|
| sourceName			| 			|  <p>Datapoints's sourceName.</p>							|
| sourceUrl			| 			|  <p>Datapoints's sourceUrl.</p>							|
| sourcePublicationDate			| 			|  <p>Datapoints's sourcePublicationDate.</p>							|
| pageNumber			| 			|  <p>Datapoints's pageNumber.</p>							|
| textSnippet			| 			|  <p>Datapoints's textSnippet.</p>							|
| screenshotType			| 			|  <p>Datapoints's screenshotType.</p>							|
| filePath			| 			|  <p>Datapoints's filePath.</p>							|
| status			| 			|  <p>Datapoints's status.</p>							|

# DerivedDatapoints

## Create derived datapoints



	POST /derived_datapoints


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| companyId			| 			|  <p>Derived datapoints's companyId.</p>							|
| datapointId			| 			|  <p>Derived datapoints's datapointId.</p>							|
| response			| 			|  <p>Derived datapoints's response.</p>							|
| performanceResult			| 			|  <p>Derived datapoints's performanceResult.</p>							|
| activeStatus			| 			|  <p>Derived datapoints's activeStatus.</p>							|
| dpStatus			| 			|  <p>Derived datapoints's dpStatus.</p>							|
| year			| 			|  <p>Derived datapoints's year.</p>							|
| lastModifiedDate			| 			|  <p>Derived datapoints's lastModifiedDate.</p>							|
| status			| 			|  <p>Derived datapoints's status.</p>							|

## Delete derived datapoints



	DELETE /derived_datapoints/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve derived datapoints



	GET /derived_datapoints


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update derived datapoints



	PUT /derived_datapoints/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| companyId			| 			|  <p>Derived datapoints's companyId.</p>							|
| datapointId			| 			|  <p>Derived datapoints's datapointId.</p>							|
| response			| 			|  <p>Derived datapoints's response.</p>							|
| performanceResult			| 			|  <p>Derived datapoints's performanceResult.</p>							|
| activeStatus			| 			|  <p>Derived datapoints's activeStatus.</p>							|
| dpStatus			| 			|  <p>Derived datapoints's dpStatus.</p>							|
| year			| 			|  <p>Derived datapoints's year.</p>							|
| lastModifiedDate			| 			|  <p>Derived datapoints's lastModifiedDate.</p>							|
| status			| 			|  <p>Derived datapoints's status.</p>							|

# Error

## Create error



	POST /error


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| errorTypeName			| 			|  <p>Error's errorTypeName.</p>							|
| errorBucket			| 			|  <p>Error's errorBucket.</p>							|
| errorDefinition			| 			|  <p>Error's errorDefinition.</p>							|
| status			| 			|  <p>Error's status.</p>							|
| createdAt			| 			|  <p>Error's createdAt.</p>							|
| updatedAt			| 			|  <p>Error's updatedAt.</p>							|

## Delete error



	DELETE /error/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve error



	GET /error/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve errors



	GET /error


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update error



	PUT /error/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| errorTypeName			| 			|  <p>Error's errorTypeName.</p>							|
| errorBucket			| 			|  <p>Error's errorBucket.</p>							|
| errorDefinition			| 			|  <p>Error's errorDefinition.</p>							|
| status			| 			|  <p>Error's status.</p>							|
| createdAt			| 			|  <p>Error's createdAt.</p>							|
| updatedAt			| 			|  <p>Error's updatedAt.</p>							|

# ErrorDetails

## Create error details



	POST /errorDetails


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| errorTypeId			| 			|  <p>Error details's errorTypeId.</p>							|
| taskId			| 			|  <p>Error details's taskId.</p>							|
| loggedBy			| 			|  <p>Error details's loggedBy.</p>							|
| comments			| 			|  <p>Error details's comments.</p>							|
| errorLoggedDate			| 			|  <p>Error details's errorLoggedDate.</p>							|
| errorStatus			| 			|  <p>Error details's errorStatus.</p>							|
| standAlonId			| 			|  <p>Error details's standAlonId.</p>							|
| status			| 			|  <p>Error details's status.</p>							|
| createdAt			| 			|  <p>Error details's createdAt.</p>							|
| updatedAt			| 			|  <p>Error details's updatedAt.</p>							|

## Delete error details



	DELETE /errorDetails/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve error details



	GET /errorDetails


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update error details



	PUT /errorDetails/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| errorTypeId			| 			|  <p>Error details's errorTypeId.</p>							|
| taskId			| 			|  <p>Error details's taskId.</p>							|
| loggedBy			| 			|  <p>Error details's loggedBy.</p>							|
| comments			| 			|  <p>Error details's comments.</p>							|
| errorLoggedDate			| 			|  <p>Error details's errorLoggedDate.</p>							|
| errorStatus			| 			|  <p>Error details's errorStatus.</p>							|
| standAlonId			| 			|  <p>Error details's standAlonId.</p>							|
| status			| 			|  <p>Error details's status.</p>							|
| createdAt			| 			|  <p>Error details's createdAt.</p>							|
| updatedAt			| 			|  <p>Error details's updatedAt.</p>							|

# Functions

## Create functions



	POST /functions


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| functionType			| 			|  <p>Functions's functionType.</p>							|
| status			| 			|  <p>Functions's status.</p>							|

## Delete functions



	DELETE /functions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve functions



	GET /functions


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update functions



	PUT /functions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| functionType			| 			|  <p>Functions's functionType.</p>							|
| status			| 			|  <p>Functions's status.</p>							|

# GroupAnalyst

## Create group analyst



	POST /groupAnalyst


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| userId			| 			|  <p>Group analyst's userId.</p>							|
| groupId			| 			|  <p>Group analyst's groupId.</p>							|
| status			| 			|  <p>Group analyst's status.</p>							|
| createdAt			| 			|  <p>Group analyst's createdAt.</p>							|
| updatedAt			| 			|  <p>Group analyst's updatedAt.</p>							|

## Delete group analyst



	DELETE /groupAnalyst/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve group analyst



	GET /groupAnalyst/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve group analysts



	GET /groupAnalyst


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update group analyst



	PUT /groupAnalyst/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| userId			| 			|  <p>Group analyst's userId.</p>							|
| groupId			| 			|  <p>Group analyst's groupId.</p>							|
| status			| 			|  <p>Group analyst's status.</p>							|
| createdAt			| 			|  <p>Group analyst's createdAt.</p>							|
| updatedAt			| 			|  <p>Group analyst's updatedAt.</p>							|

# GroupQa

## Create group qa



	POST /groupQA


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| userId			| 			|  <p>Group qa's userId.</p>							|
| groupId			| 			|  <p>Group qa's groupId.</p>							|
| status			| 			|  <p>Group qa's status.</p>							|
| createdAt			| 			|  <p>Group qa's createdAt.</p>							|
| updatedAt			| 			|  <p>Group qa's updatedAt.</p>							|

## Delete group qa



	DELETE /groupQA/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve group qa



	GET /groupQA/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve group qas



	GET /groupQA


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update group qa



	PUT /groupQA/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| userId			| 			|  <p>Group qa's userId.</p>							|
| groupId			| 			|  <p>Group qa's groupId.</p>							|
| status			| 			|  <p>Group qa's status.</p>							|
| createdAt			| 			|  <p>Group qa's createdAt.</p>							|
| updatedAt			| 			|  <p>Group qa's updatedAt.</p>							|

# Groups

## Create groups



	POST /groups


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| groupName			| 			|  <p>Groups's groupName.</p>							|
| groupAdmin			| 			|  <p>Groups's groupAdmin.</p>							|
| batchId			| 			|  <p>Groups's batchId.</p>							|
| status			| 			|  <p>Groups's status.</p>							|
| createdAt			| 			|  <p>Groups's createdAt.</p>							|
| updatedAt			| 			|  <p>Groups's updatedAt.</p>							|

## Delete groups



	DELETE /groups/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve groups



	GET /groups


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update groups



	PUT /groups/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| groupName			| 			|  <p>Groups's groupName.</p>							|
| groupAdmin			| 			|  <p>Groups's groupAdmin.</p>							|
| batchId			| 			|  <p>Groups's batchId.</p>							|
| status			| 			|  <p>Groups's status.</p>							|
| createdAt			| 			|  <p>Groups's createdAt.</p>							|
| updatedAt			| 			|  <p>Groups's updatedAt.</p>							|

# KeyIssues

## Create key issues



	POST /key_issues


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| keyIssueName			| 			|  <p>Key issues's keyIssueName.</p>							|
| keyIssueCode			| 			|  <p>Key issues's keyIssueCode.</p>							|
| keyIssueDescription			| 			|  <p>Key issues's keyIssueDescription.</p>							|
| themeId			| 			|  <p>Key issues's themeId.</p>							|
| status			| 			|  <p>Key issues's status.</p>							|

## Delete key issues



	DELETE /key_issues/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve key issues



	GET /key_issues


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update key issues



	PUT /key_issues/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| keyIssueName			| 			|  <p>Key issues's keyIssueName.</p>							|
| keyIssueCode			| 			|  <p>Key issues's keyIssueCode.</p>							|
| keyIssueDescription			| 			|  <p>Key issues's keyIssueDescription.</p>							|
| themeId			| 			|  <p>Key issues's themeId.</p>							|
| status			| 			|  <p>Key issues's status.</p>							|

# Kmp

## Create kmp



	POST /KMP


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| companyId			| 			|  <p>Kmp's companyId.</p>							|
| kmpMemberName			| 			|  <p>Kmp's kmpMemberName.</p>							|
| memberStatus			| 			|  <p>Kmp's memberStatus.</p>							|
| createdAt			| 			|  <p>Kmp's createdAt.</p>							|
| updatedAt			| 			|  <p>Kmp's updatedAt.</p>							|

## Delete kmp



	DELETE /KMP/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve kmp



	GET /KMP/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve kmps



	GET /KMP


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update kmp



	PUT /KMP/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| companyId			| 			|  <p>Kmp's companyId.</p>							|
| kmpMemberName			| 			|  <p>Kmp's kmpMemberName.</p>							|
| memberStatus			| 			|  <p>Kmp's memberStatus.</p>							|
| createdAt			| 			|  <p>Kmp's createdAt.</p>							|
| updatedAt			| 			|  <p>Kmp's updatedAt.</p>							|

# KmpMatrixDataPoints

## Create kmp matrix data points



	POST /kmpMatrixDataPoints


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| kmpId			| 			|  <p>Kmp matrix data points's kmpId.</p>							|
| dpCodeId			| 			|  <p>Kmp matrix data points's dpCodeId.</p>							|
| response			| 			|  <p>Kmp matrix data points's response.</p>							|
| year			| 			|  <p>Kmp matrix data points's year.</p>							|
| status			| 			|  <p>Kmp matrix data points's status.</p>							|
| createdAt			| 			|  <p>Kmp matrix data points's createdAt.</p>							|
| updatedAt			| 			|  <p>Kmp matrix data points's updatedAt.</p>							|

## Delete kmp matrix data points



	DELETE /kmpMatrixDataPoints/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve kmp matrix data points



	GET /kmpMatrixDataPoints


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update kmp matrix data points



	PUT /kmpMatrixDataPoints/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| kmpId			| 			|  <p>Kmp matrix data points's kmpId.</p>							|
| dpCodeId			| 			|  <p>Kmp matrix data points's dpCodeId.</p>							|
| response			| 			|  <p>Kmp matrix data points's response.</p>							|
| year			| 			|  <p>Kmp matrix data points's year.</p>							|
| status			| 			|  <p>Kmp matrix data points's status.</p>							|
| createdAt			| 			|  <p>Kmp matrix data points's createdAt.</p>							|
| updatedAt			| 			|  <p>Kmp matrix data points's updatedAt.</p>							|

# PasswordReset

## Send email



	POST /password-resets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	PUT /password-resets/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Verify token



	GET /password-resets/:token


# PolarityRule

## Create polarity rule



	POST /polarityRule


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| polarityName			| 			|  <p>Polarity rule's polarityName.</p>							|
| polarityValue			| 			|  <p>Polarity rule's polarityValue.</p>							|
| condition			| 			|  <p>Polarity rule's condition.</p>							|
| datapointId			| 			|  <p>Polarity rule's datapointId.</p>							|
| status			| 			|  <p>Polarity rule's status.</p>							|
| createdAt			| 			|  <p>Polarity rule's createdAt.</p>							|
| updatedAt			| 			|  <p>Polarity rule's updatedAt.</p>							|

## Delete polarity rule



	DELETE /polarityRule/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve polarity rule



	GET /polarityRule/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve polarity rules



	GET /polarityRule


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update polarity rule



	PUT /polarityRule/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| polarityName			| 			|  <p>Polarity rule's polarityName.</p>							|
| polarityValue			| 			|  <p>Polarity rule's polarityValue.</p>							|
| condition			| 			|  <p>Polarity rule's condition.</p>							|
| datapointId			| 			|  <p>Polarity rule's datapointId.</p>							|
| status			| 			|  <p>Polarity rule's status.</p>							|
| createdAt			| 			|  <p>Polarity rule's createdAt.</p>							|
| updatedAt			| 			|  <p>Polarity rule's updatedAt.</p>							|

# Reference

## Create reference



	POST /reference


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| standaloneId			| 			|  <p>Reference's standaloneId.</p>							|
| sourceName			| 			|  <p>Reference's sourceName.</p>							|
| url			| 			|  <p>Reference's url.</p>							|
| pageNumber			| 			|  <p>Reference's pageNumber.</p>							|
| publicationDate			| 			|  <p>Reference's publicationDate.</p>							|
| textSnippet			| 			|  <p>Reference's textSnippet.</p>							|
| screenshotInPNG			| 			|  <p>Reference's screenshotInPNG.</p>							|
| screenshotType			| 			|  <p>Reference's screenshotType.</p>							|
| filePath			| 			|  <p>Reference's filePath.</p>							|
| createdBy			| 			|  <p>Reference's createdBy.</p>							|
| activeStatus			| 			|  <p>Reference's activeStatus.</p>							|
| status			| 			|  <p>Reference's status.</p>							|
| createdAt			| 			|  <p>Reference's createdAt.</p>							|
| updatedAt			| 			|  <p>Reference's updatedAt.</p>							|

## Delete reference



	DELETE /reference/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve reference



	GET /reference/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve references



	GET /reference


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update reference



	PUT /reference/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| standaloneId			| 			|  <p>Reference's standaloneId.</p>							|
| sourceName			| 			|  <p>Reference's sourceName.</p>							|
| url			| 			|  <p>Reference's url.</p>							|
| pageNumber			| 			|  <p>Reference's pageNumber.</p>							|
| publicationDate			| 			|  <p>Reference's publicationDate.</p>							|
| textSnippet			| 			|  <p>Reference's textSnippet.</p>							|
| screenshotInPNG			| 			|  <p>Reference's screenshotInPNG.</p>							|
| screenshotType			| 			|  <p>Reference's screenshotType.</p>							|
| filePath			| 			|  <p>Reference's filePath.</p>							|
| createdBy			| 			|  <p>Reference's createdBy.</p>							|
| activeStatus			| 			|  <p>Reference's activeStatus.</p>							|
| status			| 			|  <p>Reference's status.</p>							|
| createdAt			| 			|  <p>Reference's createdAt.</p>							|
| updatedAt			| 			|  <p>Reference's updatedAt.</p>							|

# Role

## Create role



	POST /role


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| roleName			| 			|  <p>Role's roleName.</p>							|
| roleCode			| 			|  <p>Role's roleCode.</p>							|

## Delete role



	DELETE /role/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve role



	GET /role/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve roles



	GET /role


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update role



	PUT /role/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| roleName			| 			|  <p>Role's roleName.</p>							|
| roleCode			| 			|  <p>Role's roleCode.</p>							|
| status			| 			|  <p>Role's status.</p>							|

# Rules

## Create rules



	POST /rules


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| methodName			| 			|  <p>Rules's methodName.</p>							|
| methodType			| 			|  <p>Rules's methodType.</p>							|
| criteria			| 			|  <p>Rules's criteria.</p>							|
| parameter			| 			|  <p>Rules's parameter.</p>							|
| datapointId			| 			|  <p>Rules's datapointId.</p>							|
| status			| 			|  <p>Rules's status.</p>							|

## Delete rules



	DELETE /rules/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve rules



	GET /rules


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update rules



	PUT /rules/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| methodName			| 			|  <p>Rules's methodName.</p>							|
| methodType			| 			|  <p>Rules's methodType.</p>							|
| criteria			| 			|  <p>Rules's criteria.</p>							|
| parameter			| 			|  <p>Rules's parameter.</p>							|
| datapointId			| 			|  <p>Rules's datapointId.</p>							|
| status			| 			|  <p>Rules's status.</p>							|

# StandaloneDatapoints

## Create standalone datapoints



	POST /standalone_datapoints


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| companyId			| 			|  <p>Standalone datapoints's companyId.</p>							|
| performanceResult			| 			|  <p>Standalone datapoints's performanceResult.</p>							|
| response			| 			|  <p>Standalone datapoints's response.</p>							|
| year			| 			|  <p>Standalone datapoints's year.</p>							|
| standaloneStatus			| 			|  <p>Standalone datapoints's standaloneStatus.</p>							|
| taskId			| 			|  <p>Standalone datapoints's taskId.</p>							|
| submittedBy			| 			|  <p>Standalone datapoints's submittedBy.</p>							|
| submittedDate			| 			|  <p>Standalone datapoints's submittedDate.</p>							|
| activeStatus			| 			|  <p>Standalone datapoints's activeStatus.</p>							|
| lastModifiedDate			| 			|  <p>Standalone datapoints's lastModifiedDate.</p>							|
| modifiedBy			| 			|  <p>Standalone datapoints's modifiedBy.</p>							|
| isSubmitted			| 			|  <p>Standalone datapoints's isSubmitted.</p>							|
| status			| 			|  <p>Standalone datapoints's status.</p>							|

## Delete standalone datapoints



	DELETE /standalone_datapoints/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve standalone datapoints



	GET /standalone_datapoints


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update standalone datapoints



	PUT /standalone_datapoints/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| companyId			| 			|  <p>Standalone datapoints's companyId.</p>							|
| performanceResult			| 			|  <p>Standalone datapoints's performanceResult.</p>							|
| response			| 			|  <p>Standalone datapoints's response.</p>							|
| year			| 			|  <p>Standalone datapoints's year.</p>							|
| standaloneStatus			| 			|  <p>Standalone datapoints's standaloneStatus.</p>							|
| taskId			| 			|  <p>Standalone datapoints's taskId.</p>							|
| submittedBy			| 			|  <p>Standalone datapoints's submittedBy.</p>							|
| submittedDate			| 			|  <p>Standalone datapoints's submittedDate.</p>							|
| activeStatus			| 			|  <p>Standalone datapoints's activeStatus.</p>							|
| lastModifiedDate			| 			|  <p>Standalone datapoints's lastModifiedDate.</p>							|
| modifiedBy			| 			|  <p>Standalone datapoints's modifiedBy.</p>							|
| isSubmitted			| 			|  <p>Standalone datapoints's isSubmitted.</p>							|
| status			| 			|  <p>Standalone datapoints's status.</p>							|

# TaskAssignment

## Create task assignment



	POST /taskAssignment


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| companyId			| 			|  <p>Task assignment's companyId.</p>							|
| categoryId			| 			|  <p>Task assignment's categoryId.</p>							|
| groupId			| 			|  <p>Task assignment's groupId.</p>							|
| revisionCode			| 			|  <p>Task assignment's revisionCode.</p>							|
| assignedTo			| 			|  <p>Task assignment's assignedTo.</p>							|
| year			| 			|  <p>Task assignment's year.</p>							|
| analystSLA			| 			|  <p>Task assignment's analystSLA.</p>							|
| taskStatus			| 			|  <p>Task assignment's taskStatus.</p>							|
| analystEmail			| 			|  <p>Task assignment's analystEmail.</p>							|
| qaEmail			| 			|  <p>Task assignment's qaEmail.</p>							|
| qaSLA			| 			|  <p>Task assignment's qaSLA.</p>							|
| status			| 			|  <p>Task assignment's status.</p>							|
| createdAt			| 			|  <p>Task assignment's createdAt.</p>							|
| updatedAt			| 			|  <p>Task assignment's updatedAt.</p>							|

## Delete task assignment



	DELETE /taskAssignment/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve task assignment



	GET /taskAssignment/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve task assignments



	GET /taskAssignment


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update task assignment



	PUT /taskAssignment/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| companyId			| 			|  <p>Task assignment's companyId.</p>							|
| categoryId			| 			|  <p>Task assignment's categoryId.</p>							|
| groupId			| 			|  <p>Task assignment's groupId.</p>							|
| revisionCode			| 			|  <p>Task assignment's revisionCode.</p>							|
| assignedTo			| 			|  <p>Task assignment's assignedTo.</p>							|
| year			| 			|  <p>Task assignment's year.</p>							|
| analystSLA			| 			|  <p>Task assignment's analystSLA.</p>							|
| taskStatus			| 			|  <p>Task assignment's taskStatus.</p>							|
| analystEmail			| 			|  <p>Task assignment's analystEmail.</p>							|
| qaEmail			| 			|  <p>Task assignment's qaEmail.</p>							|
| qaSLA			| 			|  <p>Task assignment's qaSLA.</p>							|
| status			| 			|  <p>Task assignment's status.</p>							|
| createdAt			| 			|  <p>Task assignment's createdAt.</p>							|
| updatedAt			| 			|  <p>Task assignment's updatedAt.</p>							|

# TaskSlaLog

## Create task sla log



	POST /taskSLALog


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| taskId			| 			|  <p>Task sla log's taskId.</p>							|
| currentDate			| 			|  <p>Task sla log's currentDate.</p>							|
| preferredDate			| 			|  <p>Task sla log's preferredDate.</p>							|
| loggedBy			| 			|  <p>Task sla log's loggedBy.</p>							|
| status			| 			|  <p>Task sla log's status.</p>							|
| createdAt			| 			|  <p>Task sla log's createdAt.</p>							|
| updatedAt			| 			|  <p>Task sla log's updatedAt.</p>							|

## Delete task sla log



	DELETE /taskSLALog/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve task sla log



	GET /taskSLALog/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve task sla logs



	GET /taskSLALog


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update task sla log



	PUT /taskSLALog/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| taskId			| 			|  <p>Task sla log's taskId.</p>							|
| currentDate			| 			|  <p>Task sla log's currentDate.</p>							|
| preferredDate			| 			|  <p>Task sla log's preferredDate.</p>							|
| loggedBy			| 			|  <p>Task sla log's loggedBy.</p>							|
| status			| 			|  <p>Task sla log's status.</p>							|
| createdAt			| 			|  <p>Task sla log's createdAt.</p>							|
| updatedAt			| 			|  <p>Task sla log's updatedAt.</p>							|

# Taxonomies

## Create taxonomies



	POST /taxonomies


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| categoryId			| 			|  <p>Taxonomies's categoryId.</p>							|
| themeId			| 			|  <p>Taxonomies's themeId.</p>							|
| keyIssueId			| 			|  <p>Taxonomies's keyIssueId.</p>							|
| indicatorId			| 			|  <p>Taxonomies's indicatorId.</p>							|
| indicatorName			| 			|  <p>Taxonomies's indicatorName.</p>							|
| indicatorDescription			| 			|  <p>Taxonomies's indicatorDescription.</p>							|
| indicatorPolarity			| 			|  <p>Taxonomies's indicatorPolarity.</p>							|
| dataCollectionGuide			| 			|  <p>Taxonomies's dataCollectionGuide.</p>							|
| unit			| 			|  <p>Taxonomies's unit.</p>							|
| dataInput			| 			|  <p>Taxonomies's dataInput.</p>							|
| isApplicableSector			| 			|  <p>Taxonomies's isApplicableSector.</p>							|
| notApplicableReason			| 			|  <p>Taxonomies's notApplicableReason.</p>							|
| datapointType			| 			|  <p>Taxonomies's datapointType.</p>							|
| datapointReportingPeriod			| 			|  <p>Taxonomies's datapointReportingPeriod.</p>							|
| fileDataSource			| 			|  <p>Taxonomies's fileDataSource.</p>							|
| sourceUrl			| 			|  <p>Taxonomies's sourceUrl.</p>							|
| sourcePublicationDate			| 			|  <p>Taxonomies's sourcePublicationDate.</p>							|
| sourcePageNumber			| 			|  <p>Taxonomies's sourcePageNumber.</p>							|
| sourceTextSnippetOrSnapshot			| 			|  <p>Taxonomies's sourceTextSnippetOrSnapshot.</p>							|
| commentsAndCalculations			| 			|  <p>Taxonomies's commentsAndCalculations.</p>							|
| signal			| 			|  <p>Taxonomies's signal.</p>							|
| controversy			| 			|  <p>Taxonomies's controversy.</p>							|
| controversySnippetOrSnapshot			| 			|  <p>Taxonomies's controversySnippetOrSnapshot.</p>							|
| snippetOrSnapshotUrl			| 			|  <p>Taxonomies's snippetOrSnapshotUrl.</p>							|
| sourcePublicationDateOfConspiracy			| 			|  <p>Taxonomies's sourcePublicationDateOfConspiracy.</p>							|
| conspiracyPageNumber			| 			|  <p>Taxonomies's conspiracyPageNumber.</p>							|
| normalizedBy			| 			|  <p>Taxonomies's normalizedBy.</p>							|
| weighted			| 			|  <p>Taxonomies's weighted.</p>							|
| status			| 			|  <p>Taxonomies's status.</p>							|

## Delete taxonomies



	DELETE /taxonomies/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve taxonomies



	GET /taxonomies


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update taxonomies



	PUT /taxonomies/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| categoryId			| 			|  <p>Taxonomies's categoryId.</p>							|
| themeId			| 			|  <p>Taxonomies's themeId.</p>							|
| keyIssueId			| 			|  <p>Taxonomies's keyIssueId.</p>							|
| indicatorId			| 			|  <p>Taxonomies's indicatorId.</p>							|
| indicatorName			| 			|  <p>Taxonomies's indicatorName.</p>							|
| indicatorDescription			| 			|  <p>Taxonomies's indicatorDescription.</p>							|
| indicatorPolarity			| 			|  <p>Taxonomies's indicatorPolarity.</p>							|
| dataCollectionGuide			| 			|  <p>Taxonomies's dataCollectionGuide.</p>							|
| unit			| 			|  <p>Taxonomies's unit.</p>							|
| dataInput			| 			|  <p>Taxonomies's dataInput.</p>							|
| isApplicableSector			| 			|  <p>Taxonomies's isApplicableSector.</p>							|
| notApplicableReason			| 			|  <p>Taxonomies's notApplicableReason.</p>							|
| datapointType			| 			|  <p>Taxonomies's datapointType.</p>							|
| datapointReportingPeriod			| 			|  <p>Taxonomies's datapointReportingPeriod.</p>							|
| fileDataSource			| 			|  <p>Taxonomies's fileDataSource.</p>							|
| sourceUrl			| 			|  <p>Taxonomies's sourceUrl.</p>							|
| sourcePublicationDate			| 			|  <p>Taxonomies's sourcePublicationDate.</p>							|
| sourcePageNumber			| 			|  <p>Taxonomies's sourcePageNumber.</p>							|
| sourceTextSnippetOrSnapshot			| 			|  <p>Taxonomies's sourceTextSnippetOrSnapshot.</p>							|
| commentsAndCalculations			| 			|  <p>Taxonomies's commentsAndCalculations.</p>							|
| signal			| 			|  <p>Taxonomies's signal.</p>							|
| controversy			| 			|  <p>Taxonomies's controversy.</p>							|
| controversySnippetOrSnapshot			| 			|  <p>Taxonomies's controversySnippetOrSnapshot.</p>							|
| snippetOrSnapshotUrl			| 			|  <p>Taxonomies's snippetOrSnapshotUrl.</p>							|
| sourcePublicationDateOfConspiracy			| 			|  <p>Taxonomies's sourcePublicationDateOfConspiracy.</p>							|
| conspiracyPageNumber			| 			|  <p>Taxonomies's conspiracyPageNumber.</p>							|
| normalizedBy			| 			|  <p>Taxonomies's normalizedBy.</p>							|
| weighted			| 			|  <p>Taxonomies's weighted.</p>							|
| status			| 			|  <p>Taxonomies's status.</p>							|

# Themes

## Create themes



	POST /themes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| themeName			| 			|  <p>Themes's themeName.</p>							|
| themeCode			| 			|  <p>Themes's themeCode.</p>							|
| themeDescription			| 			|  <p>Themes's themeDescription.</p>							|
| categoryId			| 			|  <p>Themes's categoryId.</p>							|
| status			| 			|  <p>Themes's status.</p>							|

## Delete themes



	DELETE /themes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve themes



	GET /themes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update themes



	PUT /themes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| themeName			| 			|  <p>Themes's themeName.</p>							|
| themeCode			| 			|  <p>Themes's themeCode.</p>							|
| themeDescription			| 			|  <p>Themes's themeDescription.</p>							|
| categoryId			| 			|  <p>Themes's categoryId.</p>							|
| status			| 			|  <p>Themes's status.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| roleId			| String			| **optional** <p>User's roleId.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| roleId			| String			| **optional** <p>User's roleId.</p>							|

# ValidationRules

## Create validation rules



	POST /validation_rules


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| ruleName			| 			|  <p>Validation rules's ruleName.</p>							|
| condition			| 			|  <p>Validation rules's condition.</p>							|
| criteria			| 			|  <p>Validation rules's criteria.</p>							|
| minimumValue			| 			|  <p>Validation rules's minimumValue.</p>							|
| maximumValue			| 			|  <p>Validation rules's maximumValue.</p>							|
| dependantDPCodes			| 			|  <p>Validation rules's dependantDPCodes.</p>							|
| datapointId			| 			|  <p>Validation rules's datapointId.</p>							|
| status			| 			|  <p>Validation rules's status.</p>							|

## Delete validation rules



	DELETE /validation_rules/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve validation rules



	GET /validation_rules


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update validation rules



	PUT /validation_rules/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| ruleName			| 			|  <p>Validation rules's ruleName.</p>							|
| condition			| 			|  <p>Validation rules's condition.</p>							|
| criteria			| 			|  <p>Validation rules's criteria.</p>							|
| minimumValue			| 			|  <p>Validation rules's minimumValue.</p>							|
| maximumValue			| 			|  <p>Validation rules's maximumValue.</p>							|
| dependantDPCodes			| 			|  <p>Validation rules's dependantDPCodes.</p>							|
| datapointId			| 			|  <p>Validation rules's datapointId.</p>							|
| status			| 			|  <p>Validation rules's status.</p>							|

# Validations

## Create validations



	POST /validations


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| datapointId			| 			|  <p>Validations's datapointId.</p>							|
| validationRule			| 			|  <p>Validations's validationRule.</p>							|
| rule			| 			|  <p>Validations's rule.</p>							|
| dependantCode			| 			|  <p>Validations's dependantCode.</p>							|
| condition			| 			|  <p>Validations's condition.</p>							|
| criteria			| 			|  <p>Validations's criteria.</p>							|
| validationAlert			| 			|  <p>Validations's validationAlert.</p>							|
| status			| 			|  <p>Validations's status.</p>							|

## Delete validations



	DELETE /validations/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve validations



	GET /validations


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update validations



	PUT /validations/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| datapointId			| 			|  <p>Validations's datapointId.</p>							|
| validationRule			| 			|  <p>Validations's validationRule.</p>							|
| rule			| 			|  <p>Validations's rule.</p>							|
| dependantCode			| 			|  <p>Validations's dependantCode.</p>							|
| condition			| 			|  <p>Validations's condition.</p>							|
| criteria			| 			|  <p>Validations's criteria.</p>							|
| validationAlert			| 			|  <p>Validations's validationAlert.</p>							|
| status			| 			|  <p>Validations's status.</p>							|


