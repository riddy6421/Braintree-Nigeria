package matimatiks.matimatiks;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ridwan on 5/28/2017.
 */

public class ProgressReport extends AppCompatActivity {


    private ListView lv,l_v;
    private ResultAdapter resultAdapter;
    private ArrayList<String> f_str;
    private ArrayList<Result> List;
    private DatabaseReference databaseReference;
    private FirebaseAuth firebaseAuth;
    private String getRes = "";
    private Snackbar snackbar;
    private ImageButton imb_l,imb_B;
    private Animation slide,f_out;
    private TextView tv;
    private ProgressBar pbar;
    private LinearLayout ly;
    private boolean touch = true;


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        setContentView(R.layout.progress_report);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(getResources().getColor(R.color.company_color));
        }


       // Spinner sp = findViewById(R.id.drop);
        Toolbar tb = findViewById(R.id.tl);

        tb.setTitle("PROGRESS REPORT");
        tb.setTitleTextColor(Color.WHITE);

        setSupportActionBar(tb);


        this.getSupportActionBar().setDisplayShowHomeEnabled(true);
        this.getSupportActionBar().setDisplayHomeAsUpEnabled(true);





        databaseReference = FirebaseDatabase.getInstance().getReference();
        firebaseAuth = FirebaseAuth.getInstance();

       // imb_B = findViewById(R.id.prog_back);
      //  pbar = findViewById(R.id.pBar);
       // lv = findViewById(R.id.list);
       // tv = findViewById(R.id.record);
       // pbar.setVisibility(View.INVISIBLE);



        ArrayList<String>al = new ArrayList<>();

        al.add("Clear List");
        al.add("Refresh List");

        ArrayAdapter<String> listviewAdapter = new ArrayAdapter<String>(getApplicationContext()
                ,android.R.layout.simple_list_item_1, al);

        listviewAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);


    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if(id == android.R.id.home)
            finish();

        return super.onOptionsItemSelected(item);
    }

    private void processList(){

        if(firebaseAuth.getCurrentUser() != null){
            String id = firebaseAuth.getCurrentUser().getUid();
            databaseReference.child("users").child(id).child("score").addValueEventListener(new ValueEventListener() {
                @Override
                public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                    if(dataSnapshot.getValue() != null){

                        getRes = dataSnapshot.getValue().toString();

                    //    new GetScoreList(getRes).execute();

                    }

                    else {
                       pbar.setVisibility(View.GONE);
                       tv.setVisibility(View.VISIBLE);
                    }

                }

                @Override
                public void onCancelled(DatabaseError databaseError) {
                    snackbar = Snackbar.make(ly,databaseError.getMessage(),Snackbar.LENGTH_LONG);
                    View sbView = snackbar.getView();
                    TextView textView = sbView.findViewById(android.support.design.R.id.snackbar_text);
                    textView.setTextColor(Color.RED);
                    snackbar.show();
                }
            });
        }
    }


    private void removeList(){
        final AlertDialog.Builder alertDialog = new AlertDialog.Builder(ProgressReport.this);
        LayoutInflater inflater = getLayoutInflater();
        final View convertView = inflater.inflate(R.layout.edit_dialog, null);

        alertDialog.setView(convertView);

        CheckBox chk = convertView.findViewById(R.id.check_mode);
        chk.setVisibility(View.INVISIBLE);

        String tx = "Are you sure you want to delete the entire list ?";

        TextView text = convertView.findViewById(R.id.t_mode);

        text.setText(tx);

        alertDialog.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                    if (firebaseAuth.getCurrentUser() != null) {
                        String id = firebaseAuth.getCurrentUser().getUid();
                        databaseReference.child("users").child(id).child("score").addValueEventListener(new ValueEventListener() {
                            @Override
                            public void onDataChange(DataSnapshot dataSnapshot) {
                                if (dataSnapshot.getValue() != null){
                                    dataSnapshot.getRef().removeValue(new DatabaseReference.CompletionListener() {
                                        @Override
                                        public void onComplete(DatabaseError databaseError, DatabaseReference databaseReference) {
                                            snackbar = Snackbar.make(ly, "LIST DELETED", Snackbar.LENGTH_LONG);
                                            View sbView = snackbar.getView();
                                            TextView textView = sbView.findViewById(android.support.design.R.id.snackbar_text);
                                            textView.setTextColor(Color.RED);
                                            snackbar.show();
                                            lv.setVisibility(View.GONE);
                                        }
                                    });

                                }
                            }

                            @Override
                            public void onCancelled(DatabaseError databaseError) {
                                snackbar = Snackbar.make(ly, databaseError.getMessage(), Snackbar.LENGTH_LONG);
                                View sbView = snackbar.getView();
                                TextView textView = sbView.findViewById(android.support.design.R.id.snackbar_text);
                                textView.setTextColor(Color.RED);
                                snackbar.show();
                            }
                        });
                    }

            }
        }).setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {

            }
        }).setOnDismissListener(new DialogInterface.OnDismissListener() {
            @Override
            public void onDismiss(DialogInterface dialogInterface) {


            }
        });

        AlertDialog in = alertDialog.create();
        in.show();

    }

    class GetScoreList extends AsyncTask {
        
        private String scores;
        private String[] str_c;
        private int spoint;
        private String[] months;
        private String [] info;
        private ArrayList<String> attempt,sc;

        GetScoreList(String Scores){
            this.scores = Scores;
            months = new String[12];
            f_str = new ArrayList<>();
            attempt = new ArrayList<>();
            List = new ArrayList<>();
            sc = new ArrayList<>();
        }

        @Override
        protected void onPostExecute(Object o) {
            pbar.setVisibility(View.GONE);
        }

        @Override
        protected void onPreExecute() {
            pbar.setVisibility(View.VISIBLE);
        }

        @Override
        protected Object doInBackground(Object[] objects) {

            this.scores = this.scores.replace("{","");
            this.scores = this.scores.replace("}","");

            str_c = this.scores.split(",");

            for (String aStr_c : str_c) {

                 spoint = aStr_c.indexOf('=');

                f_str.add(aStr_c.substring(spoint + 1, aStr_c.length()));
            }

            String score="",exam = null,org="";

            months[0] = "Jan";months[1] = "Feb";months[2] = "Mar";
            months[3] = "Apr";months[4] = "May";months[5] = "Jun";
            months[6] = "Jul";months[7] = "Aug";months[8] = "Sep";
            months[9] = "Oct";months[10] = "Nov";months[11] = "Dec";

        for (int j = 0; j < f_str.size(); j++){

            String report = f_str.get(j);
            info =  report.split(" ");

            score = info[0];
            exam = info[info.length-1];

            attempt.add(info[info.length-2]);
            sc.add(info[0]);


            if(exam.startsWith("W")){

                String day,mon,year;

                day = info[1].substring(8,10);
                mon = info[1].substring(5,7);
                year = info[1].substring(0,4);

                int m = Integer.parseInt(mon);

                org = months[m-1]+" "+day+", "+year;

                List.add(new Result(R.mipmap.waec,org ,score));

            }

        }

        //  lv = findViewById(R.id.list);

            runOnUiThread(new Runnable() {
              @Override
              public void run() {

                  if(List.size() < 1)
                      tv.setVisibility(View.VISIBLE);

                  else {
                      resultAdapter = new ResultAdapter(getApplicationContext(), List);
                      lv.setAdapter(resultAdapter);

                      lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                          @Override
                          public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                              String time;

                              if(f_str.get(i).substring(22, 48).startsWith("0"))
                                  time = f_str.get(i).substring(22, 48);
                              else
                                  time = "Entire Time";

                              String Attempt = attempt.get(i);
                              String finalScore = sc.get(i);
                              String finalOrg = f_str.get(i).substring(2,12);
                              String finalexam = f_str.get(i).substring(f_str.get(i).length()-4);

                              Intent intent = new Intent(ProgressReport.this, ProgressScreen.class);
                              intent.putExtra("Time", time);
                              intent.putExtra("Attempt", Attempt);
                              intent.putExtra("Date", finalOrg);
                              intent.putExtra("Score", finalScore);
                              intent.putExtra("Exam", finalexam);
                              startActivity(intent);
                          }
                      });
                  }
              }
          });
            return null;
        }
    }


    class ResultAdapter extends ArrayAdapter<Result>{

        private Context context;
        private List<Result> list = new ArrayList<>();

        ResultAdapter(@NonNull Context context, ArrayList<Result> list) {
            super(context, 0,list);
            this.context = context;
            this.list = list;
        }

        @NonNull
        @Override
        public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
            View listItem = convertView;
            if(listItem == null)
                listItem = LayoutInflater.from(context).inflate(R.layout.grade,parent,false);

            Result result = list.get(position);

            ImageView image =listItem.findViewById(R.id.imageView);
            image.setImageResource (result.getmImageDrawable());

            TextView name =listItem.findViewById(R.id.textView1);
            name.setText(result.getmName());

            TextView release =  listItem.findViewById(R.id.textView2);
            String j = result.getScore();
            int x = Integer.parseInt(j);

            if(x <= 25)
                release.setBackgroundColor(Color.RED);

            else if(x>25 && x<= 39)
                release.setBackgroundColor(Color.YELLOW);

            else
                release.setBackgroundColor(Color.GREEN);

            release.setText(j.concat("/50"));

            return listItem;
        }
    }

    class Result{

        private int Res_im;
        private String exam_name;
        private String Score;

        Result(int Res_im, String exam_name,String Score){

            this.exam_name = exam_name;
            this.Score = Score;
            this.Res_im = Res_im;

        }
        int getmImageDrawable() {
            return Res_im;
        }
        String getmName() {
            return exam_name;
        }
        String getScore() {
            return Score;
        }
    }
}



