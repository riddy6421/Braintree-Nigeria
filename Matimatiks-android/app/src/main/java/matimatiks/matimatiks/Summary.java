package matimatiks.matimatiks;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.TextView;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by ridwan on 1/19/2017.
 */


public class Summary extends AppCompatActivity {
    public static boolean seen = false, displayed, saved = false;
    private String source, type, Time;
    private long Totaltime = 3000000;
    private Recommendation recommendation;
    private long Timeremaining, Timeleft;
    private ArrayList<String> get;
    private  TextView textView5;
    private DatabaseReference databaseReference;
    private FirebaseUser firebaseUser;
    private FirebaseAuth firebaseAuth;


    /**
     * Dispatch onResume() to fragments.  Note that for better inter-operation
     * with older versions of the platform, at the point of this call the
     * fragments attached to the activity are <em>not</em> resumed.  This means
     * that in some cases the previous state may still be saved, not allowing
     * fragment transactions that modify the state.  To correctly interact
     * with fragments in their proper state, you should instead override
     * {@link #onResumeFragments()}.
     */
    @Override
    protected void onResume() {
        super.onResume();
        textView5 =  findViewById(R.id.res5);

        if(displayed)
            textView5.setVisibility(View.INVISIBLE);
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_summary);
        get = new ArrayList<>();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(getResources().getColor(R.color.company_color));
        }

        Intent getIntent = getIntent();

        String result = "RESULT SUMMARY";

        seen = true;


        final int score = getIntent.getIntExtra("SCORE", -1);
        Timeremaining = getIntent.getLongExtra("TIME", -1);
        final int at = getIntent.getIntExtra("attempt",-1);
        get = getIntent.getStringArrayListExtra("AT");


        if (Questions.mode == 2)
            source = "WAEC";

        else if (Questions.frag == 1)
            source = "Jr. WAEC";

        else if (Questions.frag == 2)
            source = "Common Entrance";

        if (Questions.type == 0)
            type = "Algebra";

        else if (Questions.type == 1)
            type = "Further Maths";

        else if (Questions.type == 2)
            type = "Geometry";

        else if (Questions.type == 3)
            type = "Mensuration";

        else if (Questions.type == 4)
            type = "Numbers";

        else if (Questions.type == 5)
            type = "Statistics";

        else if (Questions.type == 6)
            type = "Trigonometry";

        else
            type = "Exam";

        Timeleft = Totaltime - Timeremaining;

         int sec = (int) (Timeleft / 1000) % 60;
         int min = (int) ((Timeleft / (1000 * 60)) % 60);
         int hrs = (int) ((Timeleft / (1000 * 60 * 60)) % 24);

        String score1 = "Result: You Attempted "+at+" Question(s) and you got "+ score + "" +
                " out of " + Questions.NOF + " questions correct.";

        String cat = "Category: " + source + " - " + type;

        String time = "Time Elapsed: " + hrs + " hr(s) " + min + " min(s) " + sec + " sec(s)";

        String Inst = "Tap to review the answers", rec = "View Result Analysis & Recommendation";

        TextView textView =   findViewById(R.id.res);
        TextView textView1 =  findViewById(R.id.res2);
        TextView textView2 =  findViewById(R.id.res3);
        TextView textView3 =  findViewById(R.id.res4);
        TextView textView4 =  findViewById(R.id.res_time);
        textView5 =  findViewById(R.id.res5);


        textView.setText(result);
        textView1.setText(score1);
        textView2.setText(cat);
        textView3.setText(Inst);
        textView4.setText(time);
        textView5.setText(rec);

        textView3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Summary.this.finish();
            }
        });


        final String final_time = ""+hrs+" hrs(s) "+min+" min(s) "+sec+" sec(s)";


        databaseReference = FirebaseDatabase.getInstance().getReference();
        firebaseAuth = FirebaseAuth.getInstance();

        Date date = Calendar.getInstance().getTime();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String exam_info = score+" "+sdf.format(date)+" "+final_time+" "+at+" "+source;

        if(firebaseAuth.getCurrentUser().getUid() != null && !saved) {

            databaseReference.child("users").child(firebaseAuth.getCurrentUser().getUid()).child("score").push().setValue(exam_info).addOnSuccessListener(new OnSuccessListener<Void>() {
                @Override
                public void onSuccess(Void aVoid) {

                    saved = true;

                }
            });

        }
        textView5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent it = new Intent(Summary.this,Recommendation.class);
                it.putExtra("num",at);
                it.putExtra("AT",get);
                it.putExtra("time",final_time);
                it.putExtra("score", score);
                displayed = true;
                startActivity(it);
            }
        });

    }
    
}

