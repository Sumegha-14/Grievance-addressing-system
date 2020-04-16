#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include<omp.h>
#include<time.h>
FILE *ptr_file_1, *ptr_file_2;	//test file pointers

/*Defination*/
#define TRUE 1
#define FALSE 0
#define Match 3
#define MissMatch -3
#define Gap -2
#define GapExt 0

/*Global Variable*/	
int inputI;
int StrLen1,StrLen2;
int intcheck = TRUE;

char holder, ch;
int filelen1 = 0;
int filelen2 = 0;
int i,j,k,l,m,n,lenA,lenB,compval;
char dash = '-';

char FASTA1[5000];   	//holds 1st string to be aligned in character array		
char FASTA2[5000];		//holds 2st string to be aligned in character array		
int HiScore=0;			//holds value of highest scoring alignment(s)	
int HiScorePos[2];		//holds the position of the HiScor
int SWArray[5001][5001];//S-W matrix		

char MaxA[5000];      
char MaxB[5000];
char OptA[5000];
char OptB[5000];

int MaxAcounter = 1;	//MaxA counter
int MaxBcounter = 1;	//MaxB counter
int cont = TRUE;
int check;

/*Alignment Function*/
int Align(int PosA,int PosB)
{
    /*Function Variable*/
	int relmax = -1;		//holds highest value in subcolumns and rows
	int relmaxpos[2];        //hold position in relmax
	if(SWArray[PosA-1][PosB-1] == 0)
	{
		cont = FALSE;
	}
	while(cont == TRUE)
	{	//until the diagonal of the current cell has a value of zero
		/*Find relmax in sub columns and rows*/
		
		for(i=PosA; i>0; --i)
		{
			if(relmax < SWArray[i-1][PosB-1])
			{
				relmax = SWArray[i-1][PosB-1];
				relmaxpos[0]=i-1;
				relmaxpos[1]=PosB-1;
			}
		}
	
		for(j=PosB; j>0; --j)
		{

			if(relmax < SWArray[PosA-1][j-1])
			{
				relmax = SWArray[PosA-1][j-1];
				relmaxpos[0]=PosA-1;
				relmaxpos[1]=j-1;
			}
		}

	/*Align strings to relmax*/
		if((relmaxpos[0] == PosA-1) && (relmaxpos[1] == PosB-1))
		{	//if relmax position is diagonal from current position simply align and increment counters

			MaxA[MaxAcounter] = FASTA1[relmaxpos[0]-1];
			++MaxAcounter;
			MaxB[MaxBcounter] = FASTA2[relmaxpos[1]-1];
			++MaxBcounter;

		}
		else
		{
			if((relmaxpos[1] == PosB-1) && (relmaxpos[0] != PosA-1))
			{	//maxB needs at least one '-'
				for(i=PosA-1; i>relmaxpos[0]-1; --i)
				{	//for all elements of FASTA1 between PosA and relmaxpos[0]
						MaxA[MaxAcounter]= FASTA1[i-1];
						++MaxAcounter;
				}
				for(j=PosA-1; j>relmaxpos[0]; --j)
				{	//set dashes to MaxB up to relmax
					MaxB[MaxBcounter] = dash;
					++MaxBcounter;
				}

				MaxB[MaxBcounter] = FASTA2[relmaxpos[1]-1];	//at relmax set pertinent FASTA2 value to MaxB
				++MaxBcounter;
			}
			if((relmaxpos[0] == PosA-1) && (relmaxpos[1] != PosB-1))
			{	//MaxA needs at least one '-'
				for(j=PosB-1; j>relmaxpos[1]-1; --j)
				{	//for all elements of FASTA2 between PosB and relmaxpos[1]
					MaxB[MaxBcounter] = FASTA2[j-1];
					++MaxBcounter;
				}
				for(i=PosB-1; i>relmaxpos[1]; --i)
				{		//set dashes to FASTA1
					MaxA[MaxAcounter] = dash;
					++MaxAcounter;
				}
				MaxA[MaxAcounter] = FASTA1[relmaxpos[0]-1];
				++MaxAcounter;
			}
		}
		//printf("(%i,%i)",relmaxpos[0],relmaxpos[1]);
		Align(relmaxpos[0],relmaxpos[1]);
	}
	return(cont);
}

/*MAIN FUNCTION*/
int main()
{
    double s,e;
	s=clock();
    //open first file
    ptr_file_1 = fopen("s2.txt", "r");
    //if file open is correct
    if(ptr_file_1 == NULL)
    {
        printf("Error opening 's2.txt'\n");
        system("PAUSE");
        exit(1);
    }
   //open second file
    ptr_file_2 = fopen("s1.txt", "r");
   //if opn file is correct
    if(ptr_file_2 == NULL)
    {
        printf("Error opening 's1.txt'\n");
        system("PAUSE");
        exit(1);
    }
 /*retrieve fasta information from files*/
    fgets(FASTA1, sizeof(FASTA1), ptr_file_1);
    fgets(FASTA2, sizeof(FASTA2), ptr_file_2);
    fclose(ptr_file_1);
    fclose(ptr_file_2);
	lenA = strlen(FASTA1);
	lenB = strlen(FASTA2);
//create empty table
	for(i=0;i<=lenA;++i)
	{
		SWArray[0][i]=0;
	}
	for(i=0;i<=lenB;++i)
	{
		SWArray[i][0]=0;
	}

	compval = 0;
        #pragma omp parallel for
		for(i = 1; i <= lenA; ++i)
	{	//for all value of FASTA1
	     #pragma omp parallel for
	    for(j = 1; j <= lenB; ++j)
	    {	//for all value of FASTA2
            //MATCH
			if(FASTA1[i-1] == FASTA2[j-1])
			{				//if current sequence values are the same
				compval = (SWArray[i-1][j-1] + Match);	//compval = diagonal + match score
				if(compval < ((SWArray[i-1][j]) + Match))
				{	    //if cell above has a greater value

					compval = ((SWArray[i-1][j]) + Match);		//set compval to that square
				}
			if(compval<(SWArray[i][j-1]+Match))
				{	//if square to the left has the highest value
				    compval=((SWArray[i][j-1])+Match);    //set compval to that square
				}
			if(compval < 0)
			{
				compval = 0;
			}
			}
			//MISMATCH

			if(FASTA1[i-1] != FASTA2[j-1])
			{					//if current sequence values are the same

				if(compval < (SWArray[i-1][j-1] + MissMatch))
				{	//compval = diagonal + match score
					compval = SWArray[i-1][j-1] + MissMatch;
                }
                if(compval < ((SWArray[i-1][j]) + MissMatch))
				{	    //if cell above has a greater value

					compval = ((SWArray[i-1][j]) + MissMatch);		//set compval to that square
				}
			
				if(compval < ((SWArray[i][j-1]) + MissMatch))
				{	//if square to the left has the highest value

					compval = ((SWArray[i][j-1]) + MissMatch);    //set compval to that square
				}
			
			if(compval < 0)
			{
				compval = 0;
			}
			}
			SWArray[i][j] = compval;	//set current cell to highest possible score and move on
			compval = 0;
		}
	}
    /*MAKE ALIGNMENT*/
	for(i=0; i<=lenA; ++i)
	{
	    //find highest score in matrix: this is the starting point of an optimal local alignment
	    for(j=0; j<=lenB; ++j)
	    {
	    	if(SWArray[i][j] > HiScore)
	        {
			HiScore = SWArray[i][j];
			HiScorePos[0]=i;
			HiScorePos[1]=j;
		}
	    }
	}

	//send Position to alignment function
	MaxA[0] = FASTA1[HiScorePos[0]-1];
	MaxB[0] = FASTA2[HiScorePos[1]-1];

	check = Align(HiScorePos[0],HiScorePos[1]);

    /*in the end reverse Max A and B*/
	k=0;
	for(i = strlen(MaxA)-1; i > -1; --i)
	{
		OptA[k] = MaxA[i];
		++k;
	}

	k=0;
	for(j=strlen(MaxB)-1; j > -1; --j)
	{
		OptB[k] = MaxB[j];
		++k;
	}

	printf("%s\n%s	",OptA,OptB);
	e=clock();
	printf("\n\n%lf",(double)(e-s)/(double)CLOCKS_PER_SEC);
	return(0);
}